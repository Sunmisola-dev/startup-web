let rowContainer = document.querySelector('#cards');
let noOfQuestion = document.getElementById('noOfQuiz');
let option = document.getElementById('option');
// let num = 1
let manageQuizs = document.querySelector('#manageQuiz');
let cateSelect = document.querySelector('#cateSelect');
let cateSelect11 = document.getElementById("cateSelect1")
let questionCate = document.querySelector('.questionCategory');
questionCate.style.display = 'none' 
let editSetQuestion = document.querySelector('#editSetQuestion');
let editOption = document.querySelector('#editOption');
let editCorrectAns = document.querySelector('#editCorrectAns');
let setEditOption = document.querySelector('#setEditOption');
let save = "";
let search = document.querySelector('#search')

// Fuunction to generate cards

function generateCards() {
    if(noOfQuestion.value == "") return false;
    rowContainer.innerHTML=""
    if(Number(noOfQuestion.value) > 30) return alert('Can not generate more than 30 cards!!!');
    questionCate.style.display = ""
    for (let i = 0; i < Number(noOfQuestion.value); i++) {
        rowContainer.innerHTML+=`
            <div class="col-md-4 col-sm-12 mb-2">
               <div class="card text-center card1">
                   <div class="card-header" id="number">
                        Question ${i + 1}
                   </div>
                   <div class="card-body">
                       <textarea class="card-title" name="question" id="setQuestion${i}" cols="30" rows="" placeholder="Set Question"></textarea>
                       <div>
                           <p class="card-text">Number of options</p>
                           <div class="input-group mb-3">
                              <div class="input-group-append">
                                   <label class="input-group-text" for="">set</label>
                               </div>
                               <select class="custom-select form-control" id="selOption${i}" onchange="generateOpsInput(${i})">
                                   <option value="">Please select an option</option>
                                   <option value="2">2</option>
                                   <option value="3">3</option>
                                   <option value="4">4</option>
                               </select>
                           </div>        
                       </div> 

                       <div class="" id="options${i}">
                   
                        </div>   
                    
                        <h6>Correct Answer</h6>
                        <div id="correctAns${i}"></div>
                        
                    </div>
                 
                </div>
            </div> 
        `;    
    };
};


function generateOpsInput(inp) {
    let opts = document.getElementById(`options${inp}`);
    let selOption = document.getElementById(`selOption${inp}`).value;
    let correctAns =document.getElementById(`correctAns${inp}`);
    correctAns.innerHTML =""
    opts.innerHTML=""
    for (let i = 0; i < Number(selOption); i++){
        opts.innerHTML +=`
            <div class="input-group mb-3 corAns">
                 <span class="input-group-text border-dark corAnss">Option ${i + 1}</span>
                <div class="input-group-append">
                    <input type="text" id="option${i}${inp}" class="form-control border-dark col-md-6 col-sm-6 question_options">
                </div>
            </div>
        `;
        correctAns.innerHTML +=`
            <div class="">
                <input class="form-check-input" type="radio" name="exampleRadios${inp}" id="exampleRadios${i}${inp}" value="option${i}${inp}">
                <label class="form-check-label text-success" for="exampleRadios${inp}">
                    Option ${i + 1}
                </label>
            </div>
        `;
       
    };
     
}; 
//  onclick of modal save button
function saveQuiz() { 
    let parentId = Math.floor(Math.random() * 1000000) * Math.floor(Math.random() * 1000000)
    let questions = []
    let duplicateStatus = false;
    let quizDetails = JSON.parse(localStorage.getItem("quizLayout")) || null
    for (let i = 0; i < Number(noOfQuestion.value); i++) {
        let obj = {
            id: Math.floor(Math.random() * 1000000),
            parentId,
            category: cateSelect.value,
            question: document.getElementById(`setQuestion${i}`).value,
            questionOption: []
        }
        // option value fetch
        let op = Number(document.getElementById(`selOption${i}`).value);
        for (let a = 0; a < op; a++) {
            let xy = {
                name: document.getElementById(`option${a}${i}`).value,
                Ans: document.getElementById(`exampleRadios${a}${i}`).checked
            }   
            obj.questionOption.push(xy)         
        }
        questions.push(obj)
    }

    let arr = []
    if (quizDetails == null) {
        arr.push(...questions);
    } 
    else {
        arr = JSON.parse(localStorage.getItem("quizLayout")); 
        arr.forEach(item => {
           if (questions.some((el) => el.question == item.question)) {
              duplicateStatus = true;
           } 
        });
        if(duplicateStatus){
            return alert("duplicate entry detected")
        }
        arr.push(...questions);
    }
    localStorage.setItem("quizLayout", JSON.stringify(arr));
    fetchData();
};

cateSelect.innerHTML =""
let categoryList = JSON.parse(localStorage.getItem("categories")) || null;
if (categoryList !== null) {
    categoryList = categoryList.filter(el => el.catesel3 == "Active")
    for (let ind = 0; ind < categoryList.length; ind++) {   
        cateSelect.innerHTML +=`<option value="${categoryList[ind].catesel1}">${categoryList[ind].catesel1}</option>`;  
    }
}
cateSelect11.innerHTML = ""
cateSelect11.innerHTML = "<option value=''>Search by Category</option>"
let categoryList1 = JSON.parse(localStorage.getItem("categories")) || null;
if (categoryList1 !== null) {
    categoryList1 = categoryList1.filter(el => el.catesel3 == "Active")
    // if (catesel3.value == "")  return alert('No Record Found')
    for (let ind = 0; ind < categoryList1.length; ind++) {   
        cateSelect11.innerHTML +=`<option value="${categoryList1[ind].catesel1}">${categoryList1[ind].catesel1}</option>`;  
    }
    
}
    // question category fetch function
function fetchData() {
    manageQuizs.innerHTML = ""
    let quizManager = JSON.parse(localStorage.getItem("quizLayout")) || null
    if (quizManager !== null) {
        // first dropdown search 
        if(cateSelect11.value) {
            quizManager=quizManager.filter(el => el.category.toLowerCase() == cateSelect11.value.toLowerCase() )
        }

        // second input search
        if (search.value) {
            quizManager=quizManager.filter(el => el.category.toLowerCase().startsWith(search.value.toLowerCase()) || el.question.toLowerCase().startsWith(search.value.toLowerCase()))
        }
       
        for (let s = 0; s < quizManager.length; s++) {
            // creating an array based on the current array
            let joined_options = quizManager[s].questionOption.map(item => {
                return item.name
            }).join(', ');
            // let joined_options = question_options_names.join(',');

            let corAnswer = quizManager[s].questionOption.filter(el=> {
                return el.Ans === true
            }).map(item => {
                return item.name
            })[0];
            manageQuizs.innerHTML += `
                <tr>
                    <td>${s+1}</td>
                    <td>${quizManager[s].category}</td>
                    <td>${quizManager[s].question}</td>
                    <td>${joined_options}</td>
                    <td><span class="btn btn-sm btn-success">${corAnswer}</span></td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#editModal" onclick="editQuiz(${quizManager[s].id})">Edit</button>
                        <button type="button" class="btn btn-primary btn-sm" onclick="deleteQuiz(${s})">Delete</button>
                    </td>
                </tr>
            `;  
        };
       document.getElementById('totalQuiz').innerHTML = quizManager.length;
    };
};
fetchData();




function deleteQuiz(ind) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover Quiz",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
   .then((willDelete) => {
        if (willDelete) {
            var holder1 = JSON.parse(localStorage.getItem('quizLayout'));
            if (holder1) {
               holder1.splice(ind, 1); 
               localStorage.setItem('quizLayout', JSON.stringify(holder1))
            }
            fetchData();
            swal("Quiz has been deleted!", {
                icon: "success",
            });
          }else {
           fetchData();
           swal("Quiz still In Check", {
               icon: "success",
            }); 
        }  
   });       
};
        //   onclick of edit button function in your table
function editQuiz(indi){
    save = indi;
    let sj = {};
    let bs = JSON.parse(localStorage.getItem("quizLayout"))
    for (let i = 0; i < bs.length; i++) {
        if (bs[i].id == indi) {
            sj = bs[i]; 
         }      
     }
     editSetQuestion.value = sj.question;
     editOption.value = sj.questionOption.length;
     editOpsInput(sj.questionOption);
};   
    //  onclick of editModal save button
function updateQuiz() {
    let bss = JSON.parse(localStorage.getItem("quizLayout"))
    if ( editSetQuestion.value == "") {
        return alert('Question field is empty')
    } else {
        for (let i = 0; i < bss.length; i++) {
          if (bss[i].id == save) {
             bss[i].question =  editSetQuestion.value;
          }
            
        }
    }
   localStorage.setItem("quizLayout", JSON.stringify(bss)) ;
   fetchData();
};
 
//   onchange function in editModal select field
function editOpsInput(optionArray) {
    setEditOption.innerHTML=""
    let correctAnswerIndex=0;
    editCorrectAns.innerHTML = ""
    for (let i = 0; i < optionArray.length; i++){
        setEditOption.innerHTML +=`
            <div class="input-group mb-3 corAns">
                 <span class="input-group-text border-dark corAnss">Option ${i + 1}</span>
                <div class="input-group-append">
                    <input type="text" value="${optionArray[i].name}" id="editoption${i}" class="form-control border-dark col-md-6 col-sm-6 edit_question_options">
                </div>
            </div>
        `;
        
        editCorrectAns.innerHTML +=`
            <div class="">
                <input class="form-check-input" type="radio" checked="false" name="editRadio" value="editRadios${i}"  id="bindValue${i}" >
                <label class="form-check-label text-success" for="bindValue${i}">
                    Option ${i + 1}
                </label>
           </div>
        `;

        if(optionArray[i].Ans) {
            correctAnswerIndex=i;

        }
    };
        document.getElementById(`bindValue${correctAnswerIndex}`).checked=true;
};