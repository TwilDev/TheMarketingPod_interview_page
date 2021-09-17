//create eventlistener on DOM load
window.addEventListener('DOMContentLoaded', (event) => {
    console.log("loaded");
    
    getResults();
    
  });

//Get resutls and display to results page
function getResults() {

  //Define max score as a divider 
  const divider = 75;

  //get the scores
  let getScore = JSON.parse(window.localStorage.getItem("scores"));

  //define a final score
  var finalScore = 0;
  //loop through array and add each questions score to the final score
  for (let i=0; i < getScore.length; i++) {
    finalScore += getScore[i];
  }
  console.log(finalScore);

  //divide by 75 & multiply by 100 to get percentage
  var percentage = parseInt(finalScore) / 75;
  percentage = percentage * 100;

  //show final score
  document.getElementById("total-score").innerHTML = "You have a " + percentage.toFixed(2) + "% Likeness!";

  //show the score rating
  showLikeness(percentage.toFixed(2))
  //draw chart and display
  drawChart(getScore);
}

//Show rating for the users score
function showLikeness(percentage) {

  //variable controlling breakpoints for what can be considered average and above average
  const rating = {
    aboveAverage : 66,
    average : 34,
  }

  //get element to append to
  let likeness = document.getElementById('likeness-rating');

  //validation if no percentage - remove section
  if(!percentage) {
    document.getElementsByClassName('results-rating')[0].style.display = "none";
  } 

  //check against rating breakpoints to determine a final rating
  if (percentage > rating.aboveAverage ) {
    likeness.innerHTML = "Above Average!"
  } else if(percentage > rating.average ) {
    likeness.innerHTML = "Average!"
  } else {
    likeness.innerHTML = "Below Average!"
  }

}

//Use Chart.js to create a simple bar chart to show results of each question
function drawChart(scoreArr) {

  var ctx = document.getElementById('resultsChart').getContext("2d");

  //define questions array for Y axis
  const questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"];

  var barGradient = ctx.createLinearGradient(700, 0, 200, 0);
  barGradient.addColorStop(0, "#18a08b");
  barGradient.addColorStop(1, "#88c7bd");

  //create a new chart at given canvas id
  new Chart("resultsChart", {
    type : "horizontalBar",
    data: {
      labels: questions,
      datasets: [{
        backgroundColor : barGradient,
        data : scoreArr
      }]
    },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }],
          yAxes: [{
            barPercentage: 0.7
        }]
      },
        legend: {display : false},
        title: {
          display : true,
          text : "Score per answer"
        }

    }
  });
}

