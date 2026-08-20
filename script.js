const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;

    // Don't allow a move on an occupied cell
    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Add color class
    event.target.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let winner = null;

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winner = board[a];
            break;
        }
    }

    if (winner) {
        statusText.textContent = `🎉 Player ${winner} Wins!`;
        gameActive = false;
        return;
    }

    // Check for draw
    if (!board.includes("")) {
        statusText.textContent = "🤝 It's a Draw!";
        gameActive = false;
        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}
