const selectedCharacters = JSON.parse(
  localStorage.getItem("selectedCharacters")
);
const userName = localStorage.getItem("username");
const chosenLevel = localStorage.getItem("level");

console.log("Chosen Level:", chosenLevel);

document.querySelector(".userName").textContent = userName;

const charImages = document.querySelectorAll(".images img");
charImages.forEach((img, index) => {
  if (selectedCharacters[index]) {
    img.src = selectedCharacters[index];
  }
});

let gameBoard = [];
let solution = [];
let selectedCell = null;
let selectedCharacter = null;
let timerInterval = null;
let seconds = 0;
let gameStarted = false;

function initGame() {
  solution = generateSolution();

  gameBoard = createGame(solution);

  renderBoard();
}

function generateSolution() {
  const base = [
    [0, 1, 2, 3],
    [2, 3, 0, 1],
    [1, 2, 3, 0],
    [3, 0, 1, 2],
  ];

  const mapping = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  return base.map((row) => row.map((cell) => mapping[cell]));
}

function levelCellsToRemove(level) {
  switch (level) {
    case "easy":
      return 5;
    case "medium":
      return 10;
    case "hard":
      return 15;
  }
}

function createGame(solution) {
  const gameGrid = JSON.parse(JSON.stringify(solution));
  const cellsToRemove = levelCellsToRemove(chosenLevel);

  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);

    if (gameGrid[row][col] !== null) {
      gameGrid[row][col] = null;
      removed++;
    }
  }

  return gameGrid;
}

function renderBoard() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const value = gameBoard[row][col];

    cell.innerHTML = "";
    cell.dataset.row = row;
    cell.dataset.col = col;

    if (value !== null) {
      const img = document.createElement("img");
      img.src = selectedCharacters[value];
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.backgroundColor = "transparent";
      img.style.margin = "auto";

      cell.appendChild(img);
      cell.classList.add("prefilled");
    } else {
      cell.classList.remove("prefilled");
      cell.addEventListener("click", selectCell);
    }
  });
}

function selectCell(e) {
  if (!gameStarted) return;
  document.querySelectorAll(".cell").forEach((c) => {
    c.classList.remove("selected");
    c.style.borderColor = "#fff";
  });

  const cell = e.currentTarget;
  cell.classList.add("selected");
  cell.style.borderColor = "#ff9800";
  selectedCell = cell;
}

charImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    if (!gameStarted) return;

    charImages.forEach((i) => i.classList.remove("char-selected"));

    img.classList.add("char-selected");

    selectedCharacter = index;

    if (selectedCell && !selectedCell.classList.contains("prefilled")) {
      placeCharacter();
    }
  });
});

function placeCharacter() {
  if (!selectedCell || selectedCharacter === null) return;

  const row = parseInt(selectedCell.dataset.row);
  const col = parseInt(selectedCell.dataset.col);

  gameBoard[row][col] = selectedCharacter;

  selectedCell.innerHTML = "";
  const img = document.createElement("img");
  img.src = selectedCharacters[selectedCharacter];
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "contain";
  img.style.backgroundColor = "transparent";
  img.style.margin = "auto";
  selectedCell.appendChild(img);

  if (selectedCharacter === solution[row][col]) {
    selectedCell.classList.add("correct");
  } else {
    selectedCell.classList.add("incorrect");
    selectedCell.style.borderColor = "red";

    setTimeout(() => {
      selectedCell.classList.remove("incorrect");
    }, 500);
  }

  checkCompletion();
}

function checkCompletion() {
  let complete = true;

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (gameBoard[row][col] !== solution[row][col]) {

        complete = false;
        break;
      }
    }
    if (!complete) break;
  }

  if (complete) {
    stopTimer();
    setTimeout(() => {
      alert(
        `Congratulations ${userName}! You completed the Game!!!`
      );
    }, 300);
  }
}

function startTimer() {
  seconds = 0;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    seconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  document.querySelector(".timerContainer").textContent = formatTime(seconds);
}

function formatTime(secs) {
  const mins = Math.floor(secs / 60);
  const remainingSecs = secs % 60;
  return `${String(mins).padStart(2, "0")}:${String(remainingSecs).padStart(
    2,
    "0"
  )}`;
}

document.querySelector(".startBtn").addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    initGame();
    startTimer();
    document.querySelector(".startBtn").textContent = "Restart";
  } else {
    stopTimer();
    gameStarted = false;
    initGame();
    startTimer();
    gameStarted = true;
  }
});

initGame();
