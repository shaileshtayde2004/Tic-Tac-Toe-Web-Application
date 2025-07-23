let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].textContent = currentPlayer;
        checkWinner();
        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatus("Player " + currentPlayer + "'s turn", "info");
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            highlightWin(pattern);
            updateStatus("Player " + currentPlayer + " wins!", "win");
            gameActive = false;
            disableBoard();
            return;
        }
    }

    if (!board.includes("")) {
        updateStatus("It's a draw!", "draw");
        gameActive = false;
        disableBoard();
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    updateStatus("Player X's turn", "info");

    const cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.textContent = "";
        cell.classList.remove("disabled");
        cell.style.backgroundColor = "";
    }
}

function disableBoard() {
    for (let cell of document.getElementsByClassName("cell")) {
        cell.classList.add("disabled");
    }
}

function updateStatus(text, type) {
    const status = document.getElementById("status");
    status.textContent = text;
    status.className = type; // Apply class like "win", "info", "draw"
}

function highlightWin(pattern) {
    for (let index of pattern) {
        document.getElementsByClassName("cell")[index].style.backgroundColor = "#90ee90"; // Light green
    }
}
