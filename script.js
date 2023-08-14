const board = document.getElementById("board");
const shuffleButton = document.getElementById("shuffleButton");

const initialState = [1, 2, 3, 4, 5, 6, 7, 8, ""];
const winningState = [...initialState];

let tiles = [];
let emptyIndex = initialState.indexOf("");

function initializeTiles() {
  for (let i = 0; i < initialState.length; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = initialState[i] !== "" ? initialState[i] : "";
    tiles.push(tile);
    tile.addEventListener("click", () => handleTileClick(i));
    board.appendChild(tile);
  }
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  emptyIndex = tiles.findIndex(tile => tile.textContent === "");
  updateTiles();
}

function updateTiles() {
  tiles.forEach((tile, index) => {
    tile.textContent = initialState[index] !== "" ? initialState[index] : "";
  });
}

function handleTileClick(clickedIndex) {
  if (isValidMove(clickedIndex)) {
    swapTiles(clickedIndex, emptyIndex);
    emptyIndex = clickedIndex;
    updateTiles();
    checkWin();
  }
}

function isValidMove(clickedIndex) {
  const rowDiff = Math.abs(clickedIndex % 3 - emptyIndex % 3);
  const colDiff = Math.abs(Math.floor(clickedIndex / 3) - Math.floor(emptyIndex / 3));
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function swapTiles(index1, index2) {
  [initialState[index1], initialState[index2]] = [initialState[index2], initialState[index1]];
}

function checkWin() {
  if (JSON.stringify(initialState) === JSON.stringify(winningState)) {
    alert("Vous avez gagné !");
  }
}

initializeTiles();
shuffleTiles();

shuffleButton.addEventListener("click", shuffleTiles);
