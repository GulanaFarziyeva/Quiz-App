const body = document.querySelector("body");
const main = document.querySelector(".main");
const startBtn = document.querySelector(".btn-start");
const questionText = document.querySelector('.question-text');
const optionList = document.querySelector('.option-list');
const nextQuestionBtn = document.querySelector('.next-question-btn');

class Question {
  constructor(questionText, options, correctVariant) {
    this.questionText = questionText;
    this.options = options;
    this.correctVariant = correctVariant;
  }

  checkTheAnswer(answer) {
    return answer === this.correctVariant;
  }
}

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.questionsIndex = 0;
  }

  getQuestions() {
    return this.questions[this.questionsIndex];
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


const quiz = new Quiz(questions);

startBtn.addEventListener("click", () => {
  startBtn.classList.add("non-active");
  body.classList.add("background");
  main.classList.add("active");

    let question = quiz.getQuestions();
    showQuestion(quiz.getQuestions())

});

nextQuestionBtn.addEventListener('click', () =>{
  if (quiz.questions.length != quiz.questionsIndex + 1) {
    quiz.questionsIndex += 1;
    showQuestion(quiz.getQuestions())
  } else {
    console.log('Finished')
  };

})

function showQuestion(item) {
  let question = `<span>${item.questionText}</span>`;
  let options = "";

  for (let variant in item.options) {
    options +=
   `
     <div class="option">
       <span><b>${variant}</b>: ${item.options[variant]}</span>
     </div>
   `;
  };

  questionText.innerHTML = question;
  optionList.innerHTML = options;

}
