const dataset = {
  music: [
    {
      id: 1,
      question: "Which of the following is not a type of music notation?",
      options: [
        "Standard notation",
        "Tab notation",
        "Morse code notation",
        "Graphics notation"
      ],
      answer: "Morse code notation",
      category: "music"
    },
    {
      id: 2,
      question: "What is the most common time signature in classical music?",
      options: ["3/4", "4/4", "5/4", "6/8"],
      answer: "4/4",
      category: "music"
    },
    {
      id: 3,
      question:
        "Which of the following is not a type of instrument in a symphony orchestra?",
      options: ["Violin", "Piano", "Harp", "Theremin"],
      answer: "Theremin",
      category: "music"
    },
    {
      id: 4,
      question: "What is the most common key in pop music?",
      options: ["C Major", "G Major", "D Major", "A Major"],
      answer: "C Major",
      category: "music"
    }
  ],
  "modern-art": [
    {
      id: 11,
      question: "Which artist is known for coining the term 'Surrealism'?",
      options: [
        "Pablo Picasso",
        "Salvador Dali",
        "Vincent van Gogh",
        "Henri Matisse"
      ],
      answer: "Salvador Dali",
      category: "modern-art"
    },
    {
      id: 12,
      question:
        "Which movement is associated with the use of abstract forms and shapes in art?",
      options: ["Impressionism", "Expressionism", "Futurism", "Cubism"],
      answer: "Cubism",
      category: "modern-art"
    }
  ],
  coding: [
    {
      id: 21,
      question: "What is the correct syntax for an if statement in Python?",
      options: [
        "if (condition):",
        "if condition",
        "if: condition",
        "if condition:"
      ],
      answer: "if condition:",
      category: "coding"
    },
    {
      id: 22,
      question: "Which of the following is not a data type in JavaScript?",
      options: ["String", "Number", "Boolean", "ArrayList"],
      answer: "ArrayList",
      category: "coding"
    },
    {
      id: 23,
      question: "Which of the following is used to declare a variable in Java?",
      options: ["var", "let", "const", "int"],
      answer: "int",
      category: "coding"
    }
  ]
};

let currentTopic = "";
let currentQuestion = 0;
let selectedAnswers = {};

// Function to show a specific screen
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => {
    screen.style.display = "none";
  });

  const screenToShow = document.getElementById(screenId);
  screenToShow.style.display = "block";
}

// Function to populate the topics list
function populateTopicsList() {
  const topicsList = document.getElementById("topics-list");

  for (const topic in dataset) {
    const listItem = document.createElement("li");
    listItem.textContent = topic;
    listItem.addEventListener("click", () => {
      startQuiz(topic);
    });
    topicsList.appendChild(listItem);
  }
}

// Function to start the quiz for a specific topic
function startQuiz(topic) {
  currentTopic = topic;
  currentQuestion = 0;
  selectedAnswers = {};

  showScreen("quiz");
  showQuestion();
}

// Function to show the current question
function showQuestion() {
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  const question = dataset[currentTopic][currentQuestion];
  questionText.textContent = question.question;

  choicesList.innerHTML = "";
  question.options.forEach((option) => {
    const listItem = document.createElement("li");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option;
    input.addEventListener("change", () => {
      selectedAnswers[currentQuestion] = option;
    });

    if (selectedAnswers[currentQuestion] === option) {
      input.checked = true;
    }

    listItem.appendChild(input);
    listItem.appendChild(document.createTextNode(option));
    choicesList.appendChild(listItem);
  });

  if (currentQuestion === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  if (currentQuestion === dataset[currentTopic].length - 1) {
    nextBtn.textContent = "Finish";
  } else {
    nextBtn.textContent = "Next";
  }
}

// Function to go to the next question
function nextQuestion() {
  if (currentQuestion < dataset[currentTopic].length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showScreen("report");
    showReport();
  }
}

// Function to go to the previous question
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

// Function to show the quiz report
function showReport() {
  const score = document.getElementById("score");
  const correctAnswers = document.getElementById("correct-answers");
  const incorrectAnswers = document.getElementById("incorrect-answers");
  const restartBtn = document.getElementById("restart-btn");

  let correctCount = 0;
  let incorrectCount = 0;

  for (const questionId in selectedAnswers) {
    const answer = selectedAnswers[questionId];
    const correctAnswer = dataset[currentTopic][questionId].answer;

    if (answer === correctAnswer) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  }

  score.textContent = `Score: ${correctCount}/${dataset[currentTopic].length}`;
  correctAnswers.textContent = `Correct Answers: ${correctCount}`;
  incorrectAnswers.textContent = `Incorrect Answers: ${incorrectCount}`;

  restartBtn.addEventListener("click", () => {
    showScreen("topic-selection");
    currentTopic = "";
    currentQuestion = 0;
    selectedAnswers = {};
  });
}

// Event listeners for next and previous buttons
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("prev-btn").addEventListener("click", prevQuestion);

// Populate the topics list when the page loads
populateTopicsList();

// Show the topic selection screen initially
showScreen("topic-selection");
