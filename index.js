const body = document.querySelector("body");
const main = document.querySelector(".main");
const startBtn = document.querySelector(".btn-start");
const questionText = document.querySelector(".question-text");
const optionList = document.querySelector(".option-list");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const questionIndexBtn = document.querySelector(".question-index");
const scoreBox = document.querySelector(".score-box-card");
const scoreText = document.querySelector(".score-text");
const replayBtn = document.querySelector(".replay");
const quitBtn = document.querySelector(".quit");

const correctIcon = '<div><i class="fa fa-duotone fa-check"></i></div>';
const incorrectIcon = '<div><i class="fa fa-regular fa-x"></i></div>';

class Question {
  constructor(questionText, options, correctVariant) {
    this.questionText = questionText;
    this.options = options;
    this.correctVariant = correctVariant;
  }

  checkTheAnswer(val) {
    return val === this.correctVariant;
  }
}

let questions = [
  new Question(
    'How do you call a function named "myFunction"?',
    {
      a: "call myFunction()",
      b: "myFunction",
      c: "myFunction()",
      d: "Function()",
    },
    "c"
  ),
  new Question(
    "How does a FOR loop start?",
    {
      a: "for(i=0; i<=5)",
      b: "for(i=0; i<5; i++)",
      c: "for i = 1 to 5",
      d: "for i = 1; i>5 i--",
    },
    "b"
  ),
  new Question(
    "Which event occurs when the user clicks on an HTML element?",
    { a: "onClick", b: "onSubmit", c: "onMouseOver", d: "onKeyPress" },
    "a"
  ),
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.questionsIndex = 0;
    this.correctAnswers = 0;
  }

  getQuestions() {
    return this.questions[this.questionsIndex];
  }
}

const quiz = new Quiz(questions);

startBtn.addEventListener("click", () => {
  startBtn.classList.add("non-active");
  body.classList.add("background");
  main.classList.add("active");

  let question = quiz.getQuestions();
  showQuestionNumber(quiz.questionsIndex + 1, quiz.questions.length);
  showQuestion(quiz.getQuestions());
});

nextQuestionBtn.addEventListener("click", () => {
  if (quiz.questions.length != quiz.questionsIndex + 1) {
    quiz.questionsIndex += 1;
    showQuestionNumber(quiz.questionsIndex + 1, quiz.questions.length);
    showQuestion(quiz.getQuestions());
  } else {
    main.classList.add("main-disable");
    nextQuestionBtn.classList.add("disabled");
    scoreBox.classList.add("active");
    showScore(quiz.questions.length, quiz.correctAnswers);
  }
});

quitBtn.addEventListener("click", () => {
  window.location.reload();
});

replayBtn.addEventListener("click", () => {
  quiz.questionsIndex = 0;
  quiz.correctAnswers = 0;
  startBtn.click();
  main.classList.remove("main-disabled");
  nextQuestionBtn.classList.remove("disabled");
  scoreBox.classList.remove("active");
});

const showQuestion = function (item) {
  let question = `<span>${item.questionText}</span>`;
  let options = "";

  for (let variant in item.options) {
    options += `
     <div class="option">
       <span><b>${variant}</b>: ${item.options[variant]}</span>
     </div>
   `;
  }

  questionText.innerHTML = question;
  optionList.innerHTML = options;

  let allOptions = optionList.querySelectorAll(".option");

  for (let vaule of allOptions) {
    vaule.setAttribute("onclick", "optionSelected(this)");
  }
};

const optionSelected = function (option) {
  let answer = option.querySelector("span b").textContent;
  let question = quiz.getQuestions();
  console.log(answer);

  let item = quiz.getQuestions();

  if (question.checkTheAnswer(answer)) {
    option.classList.add("correct");
    quiz.correctAnswers += 1;
    option.insertAdjacentHTML("beforeend", correctIcon);
  } else {
    option.classList.add("incorrect");
    option.insertAdjacentHTML("beforeend", incorrectIcon);
  }

  for (let i = 0; i < optionList.children.length; i++) {
    optionList.children[i].classList.add("disabled");
  }
};

const showQuestionNumber = function (questionNumber, allQuestionNumber) {
  let questionIndex = `<span class="question-index-btn">${questionNumber}/${allQuestionNumber}</span>`;
  questionIndexBtn.innerHTML = questionIndex;
};

const showScore = function (maxScore, correctVariant) {
  let score_text = `<div class="score-text">Your correct answers: ${correctVariant} <br><br> All questions: ${maxScore}</div>`;
  scoreText.innerHTML = score_text;
};
