let nextBtn = document.querySelector(".nextBtn");
let optionList = document.querySelector(".option-list");
let option = document.querySelector(".option");
let scorePlate = document.querySelector(".scorePlate");
let questionText = document.querySelector(".question-text");
let container = document.querySelector(".container");
let resultBox = document.querySelector(".result-box");
let tryAgain =  document.querySelector(".tryAgain");

let questionNumber = 0;
let questionCount = 1;
let userScore = 0;

runAgain();

function runAgain(){
changeQuestion(questionNumber);
showQuestionNumber();
scorePlate.innerHTML = `Score: ${userScore} / ${questions.length}`;
}
//when next is clicked it moves to the next question
nextBtn.onclick = ()=>{
    if(questionCount < questions.length){
    questionNumber++;
    changeQuestion(questionNumber);
    questionCount++;
    showQuestionNumber();
    }
    else{
        container.classList.add("hide");
        resultBox.classList.add("reveal");
        passQuestion();
    }
}

//functon to get questions and options from javascript array
function changeQuestion(index){
    questionText.innerHTML = `${questions[index].numb}. ${questions[index].question}`

    option = ` <div class="option">${questions[index].options[0]}</div>
    <div class="option" >${questions[index].options[1]}</div>
    <div class="option">${questions[index].options[2]}</div>`

    //Dom to display array text inside the document
    optionList.innerHTML = option;
    nextBtn.classList.add("disable");

    //loop through the options to see which one was selected
    for(let i = 0; i < 3; i++){
        optionList.children[i].setAttribute("onclick","optionSelected(this)");
    }
}

//Gets the question number at the bottom and displays it
function showQuestionNumber(){
    const sheetBoard = document.querySelector(".sheetBoard");
    sheetBoard.innerHTML = `${questionCount} of ${questions.length} Questions`;
}

//Targets the answer selected
function optionSelected(answer){
    const userAnswer = answer.textContent;
    const correctAnswer = `${questions[questionNumber].answer}`;
    
    if(userAnswer == correctAnswer){
        userScore++;
        scorePlate.innerHTML = `Score: ${userScore} / ${questions.length}`;
        answer.classList.add("correct");
    }
    else{
        answer.classList.add("incorrect");

        //shows the correct answer when the answer is wrong
        for(let i=0; i < 3; i++){
            if(optionList.children[i].innerHTML == correctAnswer){
                optionList.children[i].setAttribute('class','option correct');
            }
        }
    }
    //Disables the next button when any option is not selected
    nextBtn.classList.remove("disable");

    //disables optionlist when option is selected
    disable();
}

//disable function to run
function disable(){
    for(let i=0; i < optionList.children.length; i++){
        optionList.children[i].classList.add("disable");
    }
}

//Result Box is displayed 
function passQuestion(){
    const percentage = document.querySelector(".percentage");
    let percentageFixed = Math.round((userScore/questions.length)*100);
    percentage.innerHTML = Math.round((userScore/questions.length)*100) + "%";
    const scoreResult = document.querySelector(".scoreResult");
    scoreResult.innerHTML = `Scored ${userScore} out of ${questions.length}`
    const congrats = document.querySelector(".congrats");
    if(percentageFixed <= 75){
        congrats.innerHTML = "you failed !!!"
        tryAgain.classList.remove("failed");
    }
    else{
        tryAgain.classList.add("failed");
        congrats.innerHTML = "congrats !!!"
    }
}

// tryagain button when clicked
 tryAgain.onclick = function reRun(){
    container.classList.remove("hide");
    resultBox.classList.remove("reveal");

    //sets all numbers to their initial state for it to run again
    questionNumber = 0;
    questionCount = 1;
    userScore = 0;

    runAgain();
}