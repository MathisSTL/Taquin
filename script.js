const pieces = document.querySelectorAll('.puzzle-piece');

pieces.forEach(piece => {
    piece.addEventListener('click', () => {
        if (isAdjacent(piece, emptyPiece)) {
            swapPieces(piece, emptyPiece);
        }
    });
});

function getPosition(piece) {
    const index = Array.from(pieces).indexOf(piece);
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { row, col };
}

function isAdjacent(piece1, piece2) {
    const pos1 = getPosition(piece1);
    const pos2 = getPosition(piece2);
    return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col) === 1;
}

function swapPieces(piece1, piece2) {
    const tempContent = piece1.textContent;
    piece1.textContent = piece2.textContent;
    piece2.textContent = tempContent;
}
