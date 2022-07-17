function fecthData() {
    let categoryList = JSON.parse(localStorage.getItem("categories")) || null;
    if (categoryList != null) {
        document.getElementById('cateQuizData').innerHTML = categoryList.length
    }
    let manageQuiz = JSON.parse(localStorage.getItem("quizLayout")) || null;
    if (manageQuiz !== null) {
        document.getElementById('quizTotal').innerHTML = manageQuiz.length;
    }
};;
fecthData()