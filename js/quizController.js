//track score in array
var score = [];


//create eventlistener on DOM load
window.addEventListener('DOMContentLoaded', (event) => {
  console.log("loaded");
  //init quiz
  initQuizApp();
  
});


//entry point of application
function initQuizApp() {
  
  //define new object of type class
  var newQuiz = new quiz();
  
  //execute init method
  newQuiz.initQuiz()
  
  //get questions as nodelist
  const questions = document.querySelectorAll('.question-body');
  //set standard starting question
  const startingIndex = 0;
  
  //pass through nodelist and index to show first question
  newQuiz.showQuiz(questions, startingIndex);
  
  //Repeated code when adding score - could be reworked and add score could be factored out into own function

  //Event handler for clicking on next button
  const next = document.getElementById('next-btn').addEventListener("click", function() {
    //add to score 
    let addScore = newQuiz.getScore();
    //send for next question
    let nextQuestion = newQuiz.nextQuestion();
    //if no checkbox has been checked do not add retrieved score to total
    if (nextQuestion) {
      score.push(addScore);
      console.log(score);
    }
    
  });

  //Event handler for clicking on the submit button
  const submit = document.getElementById('submit-btn').addEventListener("click", function() {
    //add score to final
    var addScore = newQuiz.getScore();
    score.push(addScore);
    console.log(score)
    //set score to localStorage - allows passage to another page without sharing as a global variable or loading in excessive resources
    localStorage.setItem('scores', JSON.stringify(score));
    
    //go to results page
    window.location.href = "results.html";
  })
  
  
}