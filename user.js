let quizCate = document.querySelector('#category');
let displayCategory = document.querySelector('#displayCategory');
let cardGenerator = document.querySelector('#cards');
let cateName = document.querySelector('#cateName');
let total = document.querySelector('#total');
let initials = document.querySelector(".initials");

var user = JSON.parse(localStorage.getItem('userLogin'));
if (user) {
    swal( "Welcome" + " " + user.inputName, "Choose from the list of quiz category to countinue!", "success");
    initials.innerHTML = user.inputName.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
}

function viewProfile() {
    window.open('userprofile.html')
}
    let categoryList = JSON.parse(localStorage.getItem("categories")) || null;
    quizCate.innerHTML = ""
    quizCate.innerHTML = "<option value=''>Select...</option>"
    if (categoryList !== null) {
        categoryList = categoryList.filter(el => el.catesel3 == "Active");
        for (let i = 0; i < categoryList.length; i++) {
            quizCate.innerHTML +=`
                <option value='${categoryList[i].catesel1}'>${categoryList[i].catesel1}</option>
            `;
        }
    }
  

function generateCategory() {
    let quizManager = JSON.parse(localStorage.getItem("quizLayout")) || null
    if (quizCate.value == "") return alert("Choose from the list of categories to take quiz")
    let quizez = []
    cardGenerator.innerHTML =""
    if (quizManager !== null) {
        if(quizCate.value) {
            quizManager=quizManager.filter(el => el.category == quizCate.value)
            if (quizManager.length == "") return alert("Quiz's not available for this category") 

            for (let i = 0; i < quizManager.length; i++) {
                let relatedQuiz = []
                quizManager.forEach((element, ind) =>{
                    if(quizManager[i].parentId == element.parentId){
                        relatedQuiz.push(element)
                    }
                    
                })
                let filteredRelatedQuiz = relatedQuiz.filter(el => {
                    let status = true
                    quizez.forEach((ele, ind) => {
                        for (let indx = 0; indx < quizez[ind].length; indx++) {
                            if(quizez[ind][indx].id == el.id){
                                status = false
                            }
                        }
                    })
                    return status
                });
                if(filteredRelatedQuiz.length){
                    quizez.push(filteredRelatedQuiz)
                }  
            }
        }
            
        for (let i = 0; i < quizez.length; i++) {
        
            cardGenerator.innerHTML +=`
                <div class="card text-dark mb-3">
                    <div class="card-header d-flex justify-content-between">
                        <h5 class="cardHeader">Category ${i + 1}</h5>
                        <h5 class="cardHeader">Number Of Questions</h5>
                    </div>
                    <div class="card-body d-flex justify-content-between">
                        <h1 class="card-title cateValue" id="cateName">${quizCate.value}</h1>   
                        <h1 id="total" class="cateValue">${quizez[i].length}</h1>
                    </div>
                    <div class="card-footer">
                        <a href="quiz.html" class="btn btn-lg">Take Quiz</a>
                    </div>
                </div>
            `;
        }
    } 
   
}