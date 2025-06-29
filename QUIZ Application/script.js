const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('right-answers');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    if (!questions || questions.length === 0) {
        console.error("No questions defined!");
        return;
    }
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizScore = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    scoreDisplay.innerText = quizScore;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    setStatusClass(document.body, isCorrect);

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.disabled = true; // Prevent changing answer
    });

    if (isCorrect) {
        quizScore++;
    }

    scoreDisplay.innerText = quizScore;

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        questionElement.innerText = `Quiz finished! Your score: ${quizScore} out of ${questions.length}`;
        answerButtonsElement.innerHTML = '';
        nextButton.classList.add('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Who was the first President of the United States?',
        answers: [
            { text: 'Thomas Jefferson', correct: false },
            { text: 'George Washington', correct: true },
            { text: 'John Adams', correct: false },
            { text: 'Benjamin Franklin', correct: false }
        ]
    },
    {
        question: "Which document declared American independence from Britain?",
        answers: [
            { text: "The Constitution", correct: false },
            { text: "The Declaration of Independence", correct: true },
            { text: "The Articles of Confederation", correct: false },
            { text: "The Federalist Papers", correct: false }
        ]
    },
    {
        question: "What was the main cause of the Civil War?",
        answers: [
            { text: "Taxation without representation", correct: false },
            { text: "States' rights and slavery", correct: true },
            { text: "The election of Abraham Lincoln", correct: false },
            { text: "Industrialization differences", correct: false }
        ]
    },
    {
        question: "Which amendment gave women the right to vote?",
        answers: [
            { text: "15th Amendment", correct: false },
            { text: "19th Amendment", correct: true },
            { text: "13th Amendment", correct: false },
            { text: "1st Amendment", correct: false }
        ]
    },
    {
        question: "Who gave the 'I Have a Dream' speech?",
        answers: [
            { text: "Malcolm X", correct: false },
            { text: "Martin Luther King Jr.", correct: true },
            { text: "Rosa Parks", correct: false },
            { text: "Frederick Douglass", correct: false }
        ]
    },
    {
        question: "What event caused the U.S. to enter World War II?",
        answers: [
            { text: "The sinking of the Lusitania", correct: false },
            { text: "The attack on Pearl Harbor", correct: true },
            { text: "The invasion of Poland", correct: false },
            { text: "The Zimmerman Telegram", correct: false }
        ]
    },
    {
        question: "Which president authorized the Louisiana Purchase?",
        answers: [
            { text: "George Washington", correct: false },
            { text: "John Adams", correct: false },
            { text: "Thomas Jefferson", correct: true },
            { text: "James Madison", correct: false }
        ]
    },
    {
        question: "What was the first permanent English settlement in America?",
        answers: [
            { text: "Plymouth", correct: false },
            { text: "Jamestown", correct: true },
            { text: "Roanoke", correct: false },
            { text: "New Amsterdam", correct: false }
        ]
    },
    {
        question: "Which Native American helped the Pilgrims survive?",
        answers: [
            { text: "Geronimo", correct: false },
            { text: "Pocahontas", correct: false },
            { text: "Squanto", correct: true },
            { text: "Sitting Bull", correct: false }
        ]
    }
];
