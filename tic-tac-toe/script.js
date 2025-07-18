document.addEventListener('DOMContentLoaded', () => {
    // Gameboard class declaration
    class Gameboard {
        constructor() {
            // Board state array
            this.board = ['', '', '', '', '', '', '', '', ''];
        }
        
        // Returns the current board state
        getBoard() {
            return this.board;
        }
        
        // Updates a cell with a marker
        updateCell(index, marker) {
            if (index >= 0 && index < this.board.length && this.board[index] === '') {
                this.board[index] = marker;
                return true;
            }
            return false;
        }
        
        // Resets the board to initial state
        resetBoard() {
            this.board = ['', '', '', '', '', '', '', '', ''];
        }
    }

    // Player class declaration
    class Player {
        constructor(name, marker, isComputer = false) {
            this.name = name;
            this.marker = marker;
            this.isComputer = isComputer;
            this.score = 0;
        }
        
        // Returns player's score
        getScore() {
            return this.score;
        }
        
        // Increments player's score
        incrementScore() {
            this.score++;
        }
        
        // Resets player's score
        resetScore() {
            this.score = 0;
        }
    }

    // GameController class declaration
    class GameController {
        constructor() {
            // Gameboard instance
            this.gameboard = new Gameboard();
            // Player instances
            this.playerX = null;
            this.playerO = null;
            // Tracks current player
            this.currentPlayer = null;
            // Tracks user and computer player
            this.userPlayer = null;
            this.computerPlayer = null;
            // Game state flag
            this.gameActive = false;
            // Timeout for messages
            this.messageTimeout = null;
            // Stores player's name
            this.playerName = '';
            
            // Winning conditions array
            this.winningConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6]             // diagonals
            ];
        }
        
        // Sets the player's name
        setPlayerName(name) {
            this.playerName = name;
            document.getElementById('player-form').classList.add('hidden');
        }
        
        // Starts a new game with selected marker
        startGame(userMarker) {
            this.gameboard.resetBoard();
            
            if (userMarker === 'X') {
                // Assign user and computer players
                this.playerX = new Player(this.playerName, 'X');
                this.playerO = new Player('Computer', 'O', true);
                this.userPlayer = this.playerX;
                this.computerPlayer = this.playerO;
            } else {
                this.playerO = new Player(this.playerName, 'O');
                this.playerX = new Player('Computer', 'X', true);
                this.userPlayer = this.playerO;
                this.computerPlayer = this.playerX;
            }
            
            // Set current player to user
            this.currentPlayer = this.userPlayer;
            this.gameActive = true;
            this.updateActivePlayer();
            this.displayStaticMessage(`${this.currentPlayer.name}'s turn (${this.currentPlayer.marker})`);
            
            if (this.currentPlayer.isComputer) {
                setTimeout(() => this.computerMove(), 500);
            }
        }
        
        // Handles a move by the current player
        makeMove(index) {
            if (!this.gameActive || this.currentPlayer.isComputer) return false;
            
            if (this.gameboard.updateCell(index, this.currentPlayer.marker)) {
                if (this.checkWin()) {
                    this.endGame(this.currentPlayer);
                    return true;
                }
                
                if (this.checkDraw()) {
                    this.endGame(null);
                    return true;
                }
                
                this.switchPlayer();
                
                if (this.currentPlayer.isComputer) {
                    setTimeout(() => this.computerMove(), 500);
                }
                
                return true;
            }
            return false;
        }
        
        // Handles computer's move
        computerMove() {
            if (!this.gameActive || !this.currentPlayer.isComputer) return;
            setTimeout(() => {
                // Find best move for computer
                const moveIndex = this.findWinningMove(this.computerPlayer) || 
                                this.findWinningMove(this.userPlayer) || 
                                this.findRandomMove();
                if (moveIndex !== null && this.gameboard.updateCell(moveIndex, this.computerPlayer.marker)) {
                    // Notify UI to update
                    if (this.onBoardUpdated) {
                        this.onBoardUpdated();
                    }
                    
                    if (this.checkWin()) {
                        this.endGame(this.computerPlayer);
                        return;
                    }
                    
                    if (this.checkDraw()) {
                        this.endGame(null);
                        return;
                    }
                    this.switchPlayer();
                }
            }, 500);
        }
        
        // Finds a winning move for the given player
        findWinningMove(player) {
            const board = this.gameboard.getBoard();
            for (const condition of this.winningConditions) {
                const [a, b, c] = condition;
                if (board[a] === player.marker && board[b] === player.marker && board[c] === '') return c;
                if (board[a] === player.marker && board[c] === player.marker && board[b] === '') return b;
                if (board[b] === player.marker && board[c] === player.marker && board[a] === '') return a;
            }
            return null;
        }
        
        // Finds a random available move
        findRandomMove() {
            const board = this.gameboard.getBoard();
            const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
            return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : null;
        }
        
        // Switches to the next player
        switchPlayer() {
            this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
            this.updateActivePlayer();
            this.displayStaticMessage(`${this.currentPlayer.name}'s turn (${this.currentPlayer.marker})`);
        }
        
        // Checks if current player has won
        checkWin() {
            const board = this.gameboard.getBoard();
            return this.winningConditions.some(condition => {
                return condition.every(index => {
                    return board[index] === this.currentPlayer.marker;
                });
            });
        }
        
        // Checks for a draw
        checkDraw() {
            return this.gameboard.getBoard().every(cell => cell !== '');
        }
        
        // Ends the game and updates scores/messages
        endGame(winner) {
            this.gameActive = false;
            
            if (winner) {
                winner.incrementScore();
                this.displayTemporaryMessage(`${winner.name} wins! (${winner.marker})`, 5000);
            } else {
                this.displayTemporaryMessage("It's a draw!", 5000);
            }
            
            this.updateScores();
            this.updateActivePlayer();
            
            setTimeout(() => {
                if (!this.gameActive) {
                    this.displayStaticMessage('Choose X or O to play again');
                }
            }, 5000);
        }
        
        // Resets the game and scores
        resetGame() {
            if (this.playerX) this.playerX.resetScore();
            if (this.playerO) this.playerO.resetScore();
            this.updateScores();
            document.getElementById('player-form').classList.remove('hidden');
            this.displayStaticMessage('Enter your name and choose X or O to start');
            this.gameActive = false;
            this.currentPlayer = null;
            this.userPlayer = null;
            this.computerPlayer = null;
            this.updateActivePlayer();
        }
        
        // UI update stubs
        updateActivePlayer() {
            // To be implemented by UIController
        }
        
        updateScores() {
            // To be implemented by UIController
        }
        
        displayStaticMessage(message) {
            // To be implemented by UIController
        }
        
        displayTemporaryMessage(message, duration) {
            // To be implemented by UIController
        }
    }

    // UIController class declaration
    class UIController {
        constructor(gameController) {
            // Reference to game controller
            this.gameController = gameController;
            // Board cell elements
            this.cells = document.querySelectorAll('.cell');
            // Restart button element
            this.restartBtn = document.getElementById('restart-btn');
            // Symbol selection buttons
            this.chooseXBtn = document.getElementById('choose-x');
            this.chooseOBtn = document.getElementById('choose-o');
            // Message display element
            this.messageElement = document.querySelector('.turn-message');
            // Score display elements
            this.xScoreElement = document.querySelector('.x-score .score-count');
            this.oScoreElement = document.querySelector('.o-score .score-count');
            // Name form elements
            this.nameForm = document.getElementById('name-form');
            this.playerNameInput = document.getElementById('player-name');
            
            // Bind controller methods to UIController methods
            this.gameController.updateActivePlayer = this.updateActivePlayer.bind(this);
            this.gameController.updateScores = this.updateScores.bind(this);
            this.gameController.displayStaticMessage = this.displayStaticMessage.bind(this);
            this.gameController.displayTemporaryMessage = this.displayTemporaryMessage.bind(this);

            // Board update callback
            this.gameController.onBoardUpdated = this.renderBoard.bind(this);
            this.setupEventListeners();
        }
        
        // Updates active player UI
        updateActivePlayer() {
            const currentPlayer = this.gameController.currentPlayer;
            const gameActive = this.gameController.gameActive;
            
            this.chooseXBtn.classList.remove('active');
            this.chooseOBtn.classList.remove('active');
            
            if (gameActive && currentPlayer) {
                if (currentPlayer.marker === 'X') {
                    this.chooseXBtn.classList.add('active');
                } else {
                    this.chooseOBtn.classList.add('active');
                }
            }
        }
        
        // Updates score UI
        updateScores() {
            if (this.gameController.playerX) {
                this.xScoreElement.textContent = this.gameController.playerX.getScore();
            }
            if (this.gameController.playerO) {
                this.oScoreElement.textContent = this.gameController.playerO.getScore();
            }
        }
        
        // Displays a static message
        displayStaticMessage(message) {
            clearTimeout(this.gameController.messageTimeout);
            this.messageElement.textContent = message;
        }
        
        // Displays a temporary message
        displayTemporaryMessage(message, duration) {
            this.displayStaticMessage(message);
            this.gameController.messageTimeout = setTimeout(() => {
                if (!this.gameController.gameActive) {
                    this.displayStaticMessage('Choose X or O to play again');
                }
            }, duration);
        }
        
        // Renders the board UI
        renderBoard() {
            const board = this.gameController.gameboard.getBoard();
            this.cells.forEach((cell, index) => {
                cell.textContent = board[index];
                cell.className = 'cell';
                if (board[index] !== '') {
                    cell.classList.add(board[index].toLowerCase());
                }
            });
        }
        
        // Sets up UI event listeners
        setupEventListeners() {
            // Cell clicks
            this.cells.forEach(cell => {
                cell.addEventListener('click', () => {
                    if (this.gameController.makeMove(parseInt(cell.getAttribute('data-index')))) {
                        this.renderBoard();
                    }
                });
            });
            
            // Symbol selection
            this.chooseXBtn.addEventListener('click', () => {
                if (!this.gameController.gameActive && this.playerNameInput.value.trim()) {
                    this.gameController.startGame('X');
                    this.renderBoard();
                }
            });
            
            this.chooseOBtn.addEventListener('click', () => {
                if (!this.gameController.gameActive && this.playerNameInput.value.trim()) {
                    this.gameController.startGame('O');
                    this.renderBoard();
                }
            });
            
            // Name form submission
            this.nameForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = this.playerNameInput.value.trim();
                if (name) {
                    this.gameController.setPlayerName(name);
                    this.displayStaticMessage('Choose X or O to start playing');
                }
            });
            
            // Restart game
            this.restartBtn.addEventListener('click', () => {
                this.gameController.resetGame();
                this.renderBoard();
            });
        }
    }

    // Initialize the game controller
    const gameController = new GameController();
    // Initialize the UI controller
    new UIController(gameController);
    // Assign renderBoard method to gameController
    gameController.renderBoard = uiController.renderBoard.bind(uiController); // Add this line
});