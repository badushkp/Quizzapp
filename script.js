const questions = [
    {
        question:"Which is the Largest animal in the world?",
        answer:[
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question:"Which is the Largest desert in the world?",
        answer:[
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antartica", correct: true},
        ]
    },
    {
        question:"Which is the Smallest continent in the world?",
        answer:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        question:"Which is the Smallest country in the world?",
        answer:[
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Srilanka", correct: false},
        ]
    },
    {
        question:"Which is the Largest land animal in the world?",
        answer:[
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: false},
            {text: "Elephant", correct: true},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question:"Which is the Largest country in the world?",
        answer:[
            {text: "Russia", correct: true},
            {text: "India", correct: false},
            {text: "America", correct: false},
            {text: "China", correct: false},
        ]
    },
    {
        question:"Which is the Smallest animal in the world?",
        answer:[
            {text: "Ant", correct: false},
            {text: "Lizard", correct: false},
            {text: "Myxozoa ", correct: true},
            {text: "Mosquito", correct: false},
        ]
    },
    {
        question:"Which is the Richest Person in the world?",
        answer:[
            {text: "Mukesh Ambani", correct: false},
            {text: "Ratan Tata", correct: false},
            {text: "M.A Yousuf Ali", correct: false},
            {text: "Elon Musk", correct: true},
        ]
    },
    {
        question:"Which is the Richest Country in the world?",
        answer:[
            {text: "USA", correct: false},
            {text: "India", correct: false},
            {text: "Luxembourg", correct: true},
            {text: "Japan", correct: false},
        ]
    },
    {
        question:"What is the Currency of India?",
        answer:[
            {text: "Riyal", correct: false},
            {text: "Rupee", correct: true},
            {text: "Dolar", correct: false},
            {text: "Dinar", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

//To show Questions 
function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML= questionNo + "." + currentQuestion.question;

    //To show the 4 answers in the UI 
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        // If correct add correct to the data set
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

// Reset the state
function resetState(){
    nextButton.style.display = "none";

    // Remove all previous answers
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

// When user selects an answer
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct==='true';
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }

    // For each button it checks the data set. if it is true and disable the button and show nextbutton
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==='true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

// When user clicks the next button, it shows the next question or shows the score
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestions();
    }
    else{
        showScore();
    }
}

// Show scores when no more questions
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

// Event listener for next button click
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();