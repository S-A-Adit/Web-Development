let humanScore = 0;
let computerScore = 0;

function displayResult(message){
    document.getElementById("result").innerHTML += `<p>${message}</p>`;
}

function updateScore(){
    document.getElementById("score").innerHTML =`Human Score: ${humanScore} | Computer Score: ${computerScore}`;
}

function getComputerChoice() {
    const randomChoice = Math.random();
    if (randomChoice < 1/3) {
        return "rock";
    } else if (randomChoice < 2/3) {
        return "paper";
    } else {
        return "scissors"; 
    }
}

function playRound(humanChoice, computerChoice) {
    console.log('Human plays: ${humanChoice}');
    console.log('Computer plays: ${computerChoice}');

    if ((humanChoice === "rock" && computerChoice === "scissors") || 
        (humanChoice === "paper" && computerChoice === "rock") || 
        (humanChoice === "scissors" && computerChoice === "paper")) {
        humanScore++;
        displayResult(`You win! ${humanChoice} beats ${computerChoice}`);  
    }else if (humanChoice === computerChoice){
        displayResult("It's a tie! Play again.");   
    }else {
        computerScore++;
        displayResult(`You lose! ${computerChoice} beats ${humanChoice}`); 
    }

    updateScore();
    checkWinner();
    
}
  
function checkWinner(){
    if(humanScore ===5 || computerScore === 5){
        if (humanScore ===5){
            displayResult("<strong>Congratulations! You are the overall winner!</strong>")
    
        }else{
              displayResult("<strong>Oh no! The Computer is the overall winner!</strong>");
              
        }
        document.getElementById("rock").disabled = true;
        document.getElementById("paper").disabled = true;
        document.getElementById("scissors").disabled = true;
    }
}
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    document.getElementById("result").innerHTML = ""; //Clearing Previous Results
    updateScore();
    document.getElementById("rock").disabled = false;
    document.getElementById("paper").disabled = false;
    document.getElementById("scissors").disabled = false;
}

document.getElementById("rock").addEventListener("click" , function(){
    playRound("rock", getComputerChoice());
})

document.getElementById("paper").addEventListener("click" , function(){
    playRound("paper", getComputerChoice());
})

document.getElementById("scissors").addEventListener("click" , function(){
    playRound("scissors", getComputerChoice());
})
document.getElementById("reset").addEventListener("click", resetGame);
updateScore();