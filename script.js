const board = document.getElementById("board");
const shuffleButton = document.getElementById("shuffleButton");

const initialState = [1, 2, 3, 4, 5, 6, 7, 8, ""];

let tiles = [];

function initializeTiles() {
  for (let i = 0; i < initialState.length; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = initialState[i] !== "" ? initialState[i] : "";
    tiles.push(tile);
    board.appendChild(tile);
  }
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  updateTiles();
}

function updateTiles() {
  tiles.forEach((tile, index) => {
    tile.textContent = initialState[index] !== "" ? initialState[index] : "";
  });
}

initializeTiles();

shuffleButton.addEventListener("click", shuffleTiles);
