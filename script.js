// Quiz Questions by Category
const quizQuestions = {
    animals: [
        {
            question: "Which animal says 'Meow'?",
            image: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
            options: ["Dog", "Cat", "Duck", "Horse"],
            correctAnswer: "Cat"
        },
        {
            question: "Which animal has a very long neck?",
            image: "https://cdn-icons-png.flaticon.com/512/427/427483.png",
            options: ["Elephant", "Giraffe", "Zebra", "Lion"],
            correctAnswer: "Giraffe"
        },
        {
            question: "Which animal hops and has a pouch?",
            image: "https://cdn-icons-png.flaticon.com/512/3790/3790965.png",
            options: ["Koala", "Kangaroo", "Rabbit", "Frog"],
            correctAnswer: "Kangaroo"
        },
        {
            question: "Which animal lives in the ocean and has eight arms?",
            image: "https://cdn-icons-png.flaticon.com/512/3751/3751415.png",
            options: ["Shark", "Jellyfish", "Octopus", "Starfish"],
            correctAnswer: "Octopus"
        },
        {
            question: "Which animal has black and white stripes?",
            image: "https://cdn-icons-png.flaticon.com/512/3065/3065747.png",
            options: ["Tiger", "Panda", "Zebra", "Cow"],
            correctAnswer: "Zebra"
        }
    ],
    colors: [
        {
            question: "What color is a banana?",
            image: "https://cdn-icons-png.flaticon.com/512/3143/3143645.png",
            options: ["Red", "Yellow", "Green", "Orange"],
            correctAnswer: "Yellow"
        },
        {
            question: "What color is the sky on a clear day?",
            image: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
            options: ["Blue", "White", "Gray", "Green"],
            correctAnswer: "Blue"
        },
        {
            question: "What color is grass?",
            image: "https://cdn-icons-png.flaticon.com/512/459/459829.png",
            options: ["Blue", "Yellow", "Green", "Brown"],
            correctAnswer: "Green"
        },
        {
            question: "What color is an apple usually?",
            image: "https://cdn-icons-png.flaticon.com/512/415/415682.png",
            options: ["Orange", "Purple", "Red", "Blue"],
            correctAnswer: "Red"
        },
        {
            question: "What color is chocolate?",
            image: "https://cdn-icons-png.flaticon.com/256/5784/5784085.png",
            options: ["Brown", "White", "Black", "Yellow"],
            correctAnswer: "Brown"
        }
    ],
    food: [
        {
            question: "Which food is made from milk?",
            image: "https://cdn-icons-png.flaticon.com/256/2329/2329746.png",
            options: ["Bread", "Cheese", "Apple", "Rice"],
            correctAnswer: "Cheese"
        },
        {
            question: "Which food comes from bees?",
            image: "https://cdn-icons-png.flaticon.com/512/1256/1256449.png",
            options: ["Sugar", "Honey", "Jam", "Butter"],
            correctAnswer: "Honey"
        },
        {
            question: "Which vegetable makes you cry when you cut it?",
            image: "https://cdn-icons-png.flaticon.com/512/5346/5346247.png",
            options: ["Carrot", "Potato", "Onion", "Tomato"],
            correctAnswer: "Onion"
        },
        {
            question: "Which food is usually eaten for breakfast?",
            image: "https://cdn-icons-png.flaticon.com/512/2829/2829840.png",
            options: ["Pizza", "Cereal", "Pasta", "Burger"],
            correctAnswer: "Cereal"
        },
        {
            question: "Which fruit is yellow and has a peel?",
            image: "https://cdn-icons-png.flaticon.com/512/3143/3143645.png",
            options: ["Apple", "Banana", "Grapes", "Strawberry"],
            correctAnswer: "Banana"
        }
    ],
    numbers: [
        {
            question: "How many days are in a week?",
            image: "https://cdn-icons-png.flaticon.com/512/2693/2693507.png",
            options: ["5", "6", "7", "8"],
            correctAnswer: "7"
        },
        {
            question: "How many fingers do you have on one hand?",
            image: "https://cdn-icons-png.flaticon.com/512/2775/2775745.png",
            options: ["4", "5", "6", "10"],
            correctAnswer: "5"
        },
        {
            question: "What comes after the number 9?",
            image: "https://cdn-icons-png.flaticon.com/512/9181/9181215.png",
            options: ["8", "10", "11", "12"],
            correctAnswer: "10"
        },
        {
            question: "How many sides does a triangle have?",
            image: "https://cdn-icons-png.flaticon.com/512/649/649738.png",
            options: ["3", "4", "5", "6"],
            correctAnswer: "3"
        },
        {
            question: "How many months are in a year?",
            image: "https://cdn-icons-png.flaticon.com/512/3652/3652191.png",
            options: ["10", "11", "12", "13"],
            correctAnswer: "12"
        }
    ]
};

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizContent = document.getElementById('quiz-content');
const resultContainer = document.getElementById('result-container');
const playerNameInput = document.getElementById('player-name');
const playerDisplay = document.getElementById('player-display');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const questionImageContainer = document.getElementById('question-image-container');
const answerOptions = document.getElementById('answer-options');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score');
const finalScore = document.getElementById('final-score');
const scoreMessage = document.getElementById('score-message');
const resultFeedback = document.getElementById('result-feedback');
const tryAgainBtn = document.getElementById('try-again-btn');
const changeCategoryBtn = document.getElementById('change-category-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const timerCount = document.getElementById('timer-count');
const mascot = document.getElementById('mascot');

// Quiz State Variables
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedCategory = 'animals';
let timer;
let timeLeft = 15;
let playerAnswers = [];

// Initialize the quiz
function init() {
    // Event listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', loadNextQuestion);
    tryAgainBtn.addEventListener('click', resetQuiz);
    changeCategoryBtn.addEventListener('click', goToStartScreen);
    
    // Category selection
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedCategory = btn.dataset.category;
        });
    });
    
    // Mascot animation on hover
    mascot.addEventListener('mouseover', () => {
        mascot.style.transform = 'scale(1.1) rotate(10deg)';
    });
    
    mascot.addEventListener('mouseout', () => {
        mascot.style.transform = 'scale(1) rotate(0)';
    });
}

// Start the quiz
function startQuiz() {
    const playerName = playerNameInput.value.trim() || 'Student';
    playerDisplay.textContent = playerName;
    
    // Get questions for selected category
    currentQuestions = [...quizQuestions[selectedCategory]];
    // Shuffle questions
    shuffleArray(currentQuestions);
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    playerAnswers = [];
    
    // Show quiz content
    startScreen.style.display = 'none';
    quizContent.style.display = 'block';
    resultContainer.style.display = 'none';
    
    // Load first question
    loadQuestion();
}

// Load a question
function loadQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    // Set question image
    questionImageContainer.innerHTML = `<img src="${currentQuestion.image}" alt="Question Image">`;
    
    // Clear previous options
    answerOptions.innerHTML = '';
    
    // Create answer options
    currentQuestion.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.addEventListener('click', () => selectAnswer(li, option));
        answerOptions.appendChild(li);
    });
    
    // Update progress
    progressBar.style.width = `${((currentQuestionIndex) / currentQuestions.length) * 100}%`;
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    
    // Hide next button
    nextBtn.style.display = 'none';
    
    // Start timer
    resetTimer();
}

// Select an answer
function selectAnswer(selectedLi, selectedOption) {
    // Clear timer
    clearInterval(timer);
    
    // Disable all options
    const allOptions = answerOptions.querySelectorAll('li');
    allOptions.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // Store user's answer
    playerAnswers.push({
        question: currentQuestion.question,
        userAnswer: selectedOption,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isCorrect
    });
    
    // Update UI based on answer
    if (isCorrect) {
        selectedLi.classList.add('correct');
        score += 10;
        scoreDisplay.textContent = score;
        
        // Add animation for correct answer
        mascot.src = "https://cdn-icons-png.flaticon.com/512/742/742751.png";
        mascot.style.animation = "bounce 0.5s 3";
        
        // Play success sound
        playSound('success');
    } else {
        selectedLi.classList.add('incorrect');
        
        // Show correct answer
        allOptions.forEach(option => {
            if (option.textContent === currentQuestion.correctAnswer) {
                option.classList.add('correct');
            }
        });
        
        // Change mascot for incorrect answer
        mascot.src = "https://cdn-icons-png.flaticon.com/512/742/742753.png";
        
        // Play error sound
        playSound('error');
    }
    
    // Show next button
    nextBtn.style.display = 'block';
    
    // If last question, change button text
    if (currentQuestionIndex === currentQuestions.length - 1) {
        nextBtn.textContent = 'Finish Quiz';
    }
}

// Load next question
function loadNextQuestion() {
    currentQuestionIndex++;
    
    // Reset mascot
    mascot.src = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";
    mascot.style.animation = "bounce 2s infinite";
    
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show quiz results
function showResults() {
    quizContent.style.display = 'none';
    resultContainer.style.display = 'block';
    
    // Calculate percentage
    const percentage = (score / (currentQuestions.length * 10)) * 100;
    
    // Update final score
    finalScore.textContent = `${score}/${currentQuestions.length * 10}`;
    
    // Set appropriate message based on score
    if (percentage >= 80) {
        scoreMessage.textContent = "Excellent! You're a star! ⭐";
        createConfetti();
    } else if (percentage >= 60) {
        scoreMessage.textContent = "Good job! Keep practicing! 👍";
    } else {
        scoreMessage.textContent = "Keep trying! You can do better! 💪";
    }
    
    // Generate feedback
    generateFeedback();
}

// Generate feedback for each question
function generateFeedback() {
    resultFeedback.innerHTML = '<h3>Question Review:</h3>';
    
    playerAnswers.forEach((answer, index) => {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.textContent = answer.isCorrect ? '✅' : '❌';
        
        const text = document.createElement('p');
        text.innerHTML = `<strong>Q${index + 1}:</strong> ${answer.question}<br>
                         Your answer: ${answer.userAnswer}
                         ${!answer.isCorrect ? `<br>Correct answer: ${answer.correctAnswer}` : ''}`;
        
        feedbackItem.appendChild(icon);
        feedbackItem.appendChild(text);
        resultFeedback.appendChild(feedbackItem);
    });
}

// Reset the quiz to try again
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    playerAnswers = [];
    
    resultContainer.style.display = 'none';
    quizContent.style.display = 'block';
    
    loadQuestion();
}

// Go back to start screen
function goToStartScreen() {
    resultContainer.style.display = 'none';
    startScreen.style.display = 'block';
}

// Timer functions
function startTimer() {
    timeLeft = 15;
    timerCount.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerCount.textContent = timeLeft;
        
        if (timeLeft <= 5) {
            timerCount.style.color = 'red';
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            
            // Auto-select wrong answer if time runs out
            const currentQuestion = currentQuestions[currentQuestionIndex];
            playerAnswers.push({
                question: currentQuestion.question,
                userAnswer: "Time's up!",
                correctAnswer: currentQuestion.correctAnswer,
                isCorrect: false
            });
            
            // Show correct answer
            const allOptions = answerOptions.querySelectorAll('li');
            allOptions.forEach(option => {
                option.style.pointerEvents = 'none';
                if (option.textContent === currentQuestion.correctAnswer) {
                    option.classList.add('correct');
                }
            });
            
            // Change mascot for timeout
            mascot.src = "https://cdn-icons-png.flaticon.com/512/742/742752.png";
            
            // Show next button
            nextBtn.style.display = 'block';
            
            // If last question, change button text
            if (currentQuestionIndex === currentQuestions.length - 1) {
                nextBtn.textContent = 'Finish Quiz';
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerCount.textContent = timeLeft;
    timerCount.style.color = '#ff9a9e';
    startTimer();
}

// Helper function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create confetti effect for high scores
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';
    
    const colors = ['#ff9a9e', '#4a6baf', '#ffd700', '#66bb6a', '#ff7043'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        confettiContainer.appendChild(confetti);
        
        // Animate confetti
        setTimeout(() => {
            confetti.style.top = '100%';
            confetti.style.opacity = '0';
            confetti.style.transition = `top ${Math.random() * 3 + 2}s linear, opacity ${Math.random() * 3 + 2}s linear`;
            confetti.style.opacity = '1';
        }, Math.random() * 500);
    }
}

// Play sound effects
function playSound(type) {
    // This is a placeholder for sound implementation
    // In a real implementation, you would create audio elements and play them
    console.log(`Playing ${type} sound`);
}

// Initialize the quiz when the page loads
window.addEventListener('load', init);
