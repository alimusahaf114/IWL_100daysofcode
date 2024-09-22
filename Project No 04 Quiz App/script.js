const questions = [
  {
    question: "What is the main function of RAM in a computer?",
    choices: [
      "Permanent storage",
      "Processing speed",
      "Temporary data storage",
      "Graphics rendering",
    ],
    answer: 2,
  },

  {
    question:
      "Which type of network is used to connect devices within a small geographical area like a building?",
    choices: ["LAN", "WAN", "MAN", "PAN"],
    answer: 0,
  },
  {
    question: "Which device is used to connect multiple devices on a network?",
    choices: ["Modem", "Router", "Monitor", "Keyboard"],
    answer: 1,
  },
  {
    question: "Which of the following is NOT a programming language?",
    choices: ["Python", "Java", "HTML", "Linux"],
    answer: 3,
  },
  {
    question:
      "Which technology is used to secure data in communication over the internet?",
    choices: ["SSL", "HTML", "CSS", "IP"],
    answer: 0,
  },
  {
    question:
      "Which of the following is a relational database management system (RDBMS)?",
    choices: ["MongoDB", "MySQL", "React", "Node.js"],
    answer: 1,
  },
  {
    question: "Which of the following is used to style web pages?",
    choices: ["HTML", "CSS", "Python", "SQL"],
    answer: 1,
  },
  {
    question: "Which of the following is used for version control?",
    choices: ["Git", "Java", "Apache", "Windows"],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selected = false; // To check if an answer is already selected
let userAnswers = new Array(questions.length).fill(null); // Store user's answers

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const preButton = document.getElementById("pre-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = `${currentQuestionIndex + 1}: ${
    currentQuestion.question
  }`;
  questionElement.style.color = "white";
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = choice;
    button.style.padding = "10px";
    button.style.width = "300px";
    button.style.backgroundColor = "white";
    button.style.color = "black";

    // Add a class for styling
    button.classList.add("choice-btn");

    // Highlight previously selected answer
    if (userAnswers[currentQuestionIndex] === index) {
      if (userAnswers[currentQuestionIndex] === currentQuestion.answer) {
        button.style.backgroundColor = "green";
        button.style.color = "white";
      } else {
        button.style.backgroundColor = "red";
        button.style.color = "white";
      }
    }

    button.addEventListener("click", () => selectAnswer(index, button));
    li.appendChild(button);
    choicesElement.appendChild(li);
  });
}

function selectAnswer(selectedIndex, button) {
  if (selected) return; // Prevent selecting another answer after the first selection

  const correctIndex = questions[currentQuestionIndex].answer;

  // Update score if changing previous answer
  if (userAnswers[currentQuestionIndex] !== null) {
    if (userAnswers[currentQuestionIndex] === correctIndex) {
      score--; // Deduct score if the correct answer was selected earlier
    }
  }

  userAnswers[currentQuestionIndex] = selectedIndex;

  if (selectedIndex === correctIndex) {
    button.style.backgroundColor = "green"; // Set to green for correct answer
    button.style.color = "white";
    score++;
  } else {
    button.style.backgroundColor = "red"; // Set to red for wrong answer
    button.style.color = "white";
  }

  selected = true; // Prevent multiple selections
  nextButton.disabled = false; // Enable the "Next" button
  preButton.disabled = true; // Disable the "Previous" button after selection
}

function showNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    selected = false; // Reset selection state
    showQuestion();
    nextButton.disabled = true;
    preButton.disabled = false;
  } else {
    showScore();
  }
}

function showPrevQuestion() {
  currentQuestionIndex--;

  if (currentQuestionIndex >= 0) {
    selected = false; // Reset selection state
    showQuestion();
    nextButton.disabled = false;
    preButton.disabled = currentQuestionIndex === 0;
  }
}

function showScore() {
  // Hide elements
  questionElement.style.display = "none";
  choicesElement.style.display = "none";
  nextButton.style.display = "none";
  preButton.style.display = "none";

  // Show score container
  scoreContainer.style.display = "block";

  // Set the score message based on performance
  if (score >= 5) {
    scoreElement.innerHTML = `
      <div class="score-message success">
        🎉 <strong>Congratulations!</strong><br/>
        You passed the test!<br/>
        <span class="score-details">Your Score: ${score} / ${questions.length}</span>
      </div>`;
    scoreContainer.style.backgroundColor = "white";
  } else {
    scoreElement.innerHTML = `
      <div class="score-message fail">
        😞 <strong>Oops!</strong><br/>
        You couldn't pass the test.<br/>
        <span class="score-details">Your Score: ${score} / ${questions.length}</span>
      </div>`;
    scoreContainer.style.backgroundColor = "white";
  }
}

nextButton.addEventListener("click", showNextQuestion);
preButton.addEventListener("click", showPrevQuestion);

// Initialize the quiz
showQuestion();
nextButton.disabled = true;
