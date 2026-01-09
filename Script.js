let today = new Date();
let targetA = "2026-01-09";
let targetB = "2026-01-10";
let targetC = "2026-01-11";

let randomNumber;
let guesses = []; 
let maxTries = 5;

const message = document.getElementById('message');
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const guessHistory = document.getElementById('guessHistory');
const historySection = document.getElementById('historySection');
const livesDisplay = document.getElementById('livesDisplay');
const resetBtn = document.getElementById('resetBtn');

function initGame() {
    if (today.toISOString().startsWith(targetA)) {
        randomNumber = 276;
    } else if(today.toISOString().startsWith(targetB)){
        randomNumber = 277;
    } else if(today.toISOString().startsWith(targetC)){
        randomNumber = 278;
    } else {
        randomNumber = Math.floor(Math.random() * 1000) + 1
    }
}

initGame();

submitBtn.addEventListener('click', function() {
    const userGuess = parseInt(guessInput.value);

    // 1. Validation (Ensures it's a number and within range)
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 1000) {
        message.textContent = "Please enter a number between 1 and 1000";
        message.style.color = "orange";
        return; 
    }

    // 2. Determine the arrow direction
    let direction = '';
    if (userGuess < randomNumber) {
        direction = '↑';
        message.textContent = "Too low! ↑";
        message.style.color = "#d9534f";
    } else if (userGuess > randomNumber) {
        direction = '↓';
        message.textContent = "Too high! ↓";
        message.style.color = "#d9534f";
    }

    // 3. Save the guess to our array
    guesses.push({ val: userGuess, dir: direction });

    // 4. Update the History and Lives display
    updateHistory();
    let remaining = maxTries - guesses.length;
    livesDisplay.textContent = `Tries left: ${remaining}`;

    // 5. Check Win/Loss Condition
    if (userGuess === randomNumber) {
        message.textContent = "🎉 Correct! You got it!";
        message.style.color = "green";
        gameOver();
    } else if (remaining <= 0) {
        message.textContent = `Game Over! The number was $${randomNumber}.`;
        message.style.color = "black";
        gameOver();
    }

    // 6. Clean up for next guess
    guessInput.value = '';
    guessInput.focus();
});

function updateHistory() {
    // Show the section now that there is data to see
    historySection.style.display = 'block';
    guessHistory.innerHTML = ''; 
    
    guesses.forEach(guess => {
        const chip = document.createElement('span');
        chip.classList.add('guess-chip');
        
        let arrowColor = '#d9534f';
        
        // Only show an arrow if it wasn't the correct guess
        let arrowHTML = guess.dir ? `<small style="color: ${arrowColor}">${guess.dir}</small>` : '';
        
        chip.innerHTML = `$${guess.val} ${arrowHTML}`;
        guessHistory.appendChild(chip);
    });
}

function gameOver() {
    submitBtn.disabled = true;
    guessInput.disabled = true;
    resetBtn.style.display = 'block';
}

resetBtn.addEventListener('click', function() {
    // Re-randomize and reset variables
    initGame();
    guesses = [];
    
    // Reset UI
    message.textContent = '';
    guessInput.disabled = false;
    guessInput.value = '';
    submitBtn.disabled = false;
    resetBtn.style.display = 'none';
    historySection.style.display = 'none';
    livesDisplay.textContent = `Tries left: ${maxTries}`;
});