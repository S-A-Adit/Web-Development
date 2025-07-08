let humanScore = 0;
let computerScore = 0;

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

function getHumanChoice() {
    let choice = "";
    let validInput = false;
  
    while (!validInput) {
        choice = prompt("Choose: Rock, Paper, or Scissors?").toLowerCase();
        if (["rock", "paper", "scissors"].includes(choice)) {
            validInput = true;
        } else {
            alert("Invalid choice! Please enter 'Rock', 'Paper', or 'Scissors'.");
        }
    }
    return choice;
}

function playRound(humanChoice, computerChoice) {
    console.log(`Human plays: ${humanChoice}`);
    console.log(`Computer plays: ${computerChoice}`);

    if ((humanChoice === "rock" && computerChoice === "scissors") || 
        (humanChoice === "paper" && computerChoice === "rock") || 
        (humanChoice === "scissors" && computerChoice === "paper")) {
        humanScore++;
        console.log(`You win! ${humanChoice} beats ${computerChoice}`);  
    } else {
        computerScore++;
        console.log(`You lose! ${computerChoice} beats ${humanChoice}`); 
    }
}
  
function playGame() {
    humanScore = 0;
    computerScore = 0;
    console.log("--- Starting a new game of Rock, Paper, Scissors (Best of 5) ---");
    
    for (let i = 1; i <= 5; i++) {  
        console.log(`\n--- Round ${i} ---`);
        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();
        
        while (humanSelection === computerSelection) {
            console.log("It's a tie! Pick again.");
            humanSelection = getHumanChoice();
            computerSelection = getComputerChoice();
        }
        
        playRound(humanSelection, computerSelection);
    }

    console.log("\n--- Game Over! Final Scores ---");
    console.log(`Human Score: ${humanScore}`);
    console.log(`Computer Score: ${computerScore}`);

    if (humanScore > computerScore) {
        console.log("Congratulations! You are the overall winner!");
    } else {
        console.log("Oh no! The Computer is the overall winner!");
    }
}
