class quiz {
    constructor(){
      //create list of questions as an array of objects - can be accessed and stored int he quiz controller - ideally would be pulluing from a database of sorts and storing as a JSON file or localStorage
      this._questionList = [
        {
          question : "What do you love most about these guys?",
          image : "img/red-panda.jpg",
          answers : {
            a: {
              text : "They're spooked easily",
              value : 15
            },          
            b: {
              text : "They have bushy tails",
              value : 10
            }, 
            c: {
              text : "I don't like much about them...",
              value : 5
            } 
          }
        },
        {
          question : "Whats your favourite attribute of these guys?",
          image : "img/highland-cow.jpg",
          answers : {
            a: {
              text : "They have cool horns",
              value : 10
            },          
            b: {
              text : "They're extremely cute and fluffy!",
              value : 15
            }, 
            c: {
              text : "Nothing in particular...",
              value : 5
            } 
          }
        },
        {
          question : "What stands out to you most about this animal?",
          image : "img/reindeer.jpg",
          answers : {
            a: {
              text : "They have beautiful antlers",
              value : 15
            },          
            b: {
              text : "They have tiny little tails",
              value : 10
            }, 
            c: {
              text : "This is just a deer, it's not that spectacular...",
              value : 5
            } 
          }
        },
        {
          question : "What is the most amazing part of these guys",
          image : "img/seal.png",
          answers : {
            a: {
              text : "Everything, they are flawless.",
              value : 15
            },          
            b: {
              text : "How cute they are!",
              value : 10
            }, 
            c: {
              text : "They aren't very amazing...",
              value : 5
            } 
          }
        },
        {
          question : "What makes this kind of dog one of the most amazing breeds",
          image : "img/samoyed.jpg",
          answers : {
            a: {
              text : "They look like happy clouds",
              value : 15
            },          
            b: {
              text : "How friendly they are!",
              value : 10
            }, 
            c: {
              text : "They're not the most amazing breed... :(",
              value : 5
            } 
          }
        }
      ];
      //Define attribute for the output source
      this._questionOutput = document.getElementById('question-container');
      //attribute for question bodies
      this._questions = document.querySelectorAll('.question-body');
      //object for saving score;
    }
    
    //initialise quiz and prepare questions
    initQuiz() {
     
      //output for showing the question
      const questionOutput = []; 
      
      //loop through each question passing through object element and index 
      this._questionList.forEach((questionContent, questionIndex) => {
        //storage for answers 
        const answers = [];
        //loop through answer object for each question
        for (const answerList in questionContent.answers) {
          // store answers within array - storing the question number in name attribute 
          answers.push(
            //create output for question adding the answers value to the radion button to calculate final score and easily adjust what each answer is worth
            `<div class="pb-4">
              <input type="radio" class="question-radio-${questionIndex}" name="question-${questionIndex}" value="${questionContent.answers[answerList].value}"> 
              <p class="inline-block m-0 text-xs md:text-sm lg:text-base">${answerList} -
              ${questionContent.answers[answerList].text}
              </p>
             </div>`
          );
        }
        //add each question to the final output - add inactive question to hide questions
        questionOutput.push(
          `<div class="question-body bg-white hidden" id="${questionIndex}">
             <div class="question text-center pb-10 md:text-lg"> ${questionContent.question} </div>
             <div class="image-container">
             <img class="image-container h-[500px] pb-10" style="width:500px" src="${questionContent.image}" />
             </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
      
      //output questions to page
      this._questionOutput.innerHTML = questionOutput.join("");
      
    }
    
    //displays quiz initial question
    showQuiz(questions, num) {
      //gets question at given index and adds correct class to display
      questions.item(num).classList.add('active-question');
      questions.item(num).classList.remove('inactive-question');

      questions.item(num).classList.remove('hidden');
      questions.item(num).classList.add('block');
    }
    
    //find the score of each question and add it to the total
    addScore(questionScore) {
      //finds all inputs with relevant class
      let getQuestion = document.querySelectorAll('.question-radio-'+questionScore);
      //iterate through and find checked answer
      for (let i=0; i < getQuestion.length; i++) {
        //when found checked get name and return score
        if(getQuestion[i].checked) { 
          let addScore = getQuestion[i].getAttribute("value");
          let add = parseInt(addScore);
          return add;
        }
      }
        
    }
    
    //check if current question is the last
    checkIfLast(id) {
      let checkQuestion = parseInt(id);
      if (checkQuestion == 3) {
        document.getElementById('next-btn').classList.remove("block");
        document.getElementById('next-btn').classList.add("hidden");
        document.getElementById('submit-btn').classList.remove("hidden");
        document.getElementById('submit-btn').classList.add("block");
      }
    }

    //Checks if a radio button has been checked before moving to the next question
    checkIfChecked(questionId) {
      //finds all inputs with relevant class
      let getQuestion = document.querySelectorAll('.question-radio-'+questionId);
      //decalre checkTally and set it to 0
      var checkTally = 0;
      //iterate through radio buttons to see if any are checked
      for (let i=0; i < getQuestion.length; i++) {
        //if button is checked add one to tally
        if (getQuestion[i].checked) {
            checkTally += 1;
        };
      }

      //if tally is 1 then return if 0 or somehow over 1 return false
      if (checkTally !== 1) {
          return false;
      } else {
          return true;
      }

    }
    
    //Finds the value of the answer given and returns it
    getScore() {

        let currentQuestionId = document.getElementsByClassName('active-question')[0].id;
        //get the score of the current question
        var score = this.addScore(currentQuestionId);
        //return score to be added
        return score;
        
    }

    //displays next question
    nextQuestion() {
      //get id of the current active question
      let currentQuestion = document.getElementsByClassName('active-question')[0];
      let currentQuestionId = document.getElementsByClassName('active-question')[0].id;

      //check if question is the last
      this.checkIfLast(currentQuestionId);
    
      //check if button has been pressed before clicking next
      let validate = this.checkIfChecked(currentQuestionId);

      //will not progress user is no radio button is pressed and will do so if one has been checked
      if (!validate) {
          return false;
      } else {
        //add 1 and convert to string - use to find id of the next question
        let nextQuestion = document.getElementById(String(+currentQuestionId + 1));
        currentQuestion.classList.toggle("active-question");
        nextQuestion.classList.toggle("active-question");
        //display questions
        currentQuestion.classList.add("hidden");
        nextQuestion.classList.remove("hidden");
        nextQuestion.classList.add("block");
        return true;
      }


    }
  
  }