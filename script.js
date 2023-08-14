function shuffle() {
    var grid = document.getElementById('game');
    var items = Array.from(grid.children);

    // Shuffle the items using Fisher-Yates algorithm
    for (var i = items.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [items[i].innerText, items[j].innerText] = [items[j].innerText, items[i].innerText];
    }

    if (!isSolvable(items.map(item => item.innerText))) {
        // If the shuffled configuration is not solvable, swap the first two items
        [items[0].innerText, items[1].innerText] = [items[1].innerText, items[0].innerText];
    }

    items.forEach(item => grid.appendChild(item));
}

function isSolvable(puzzle) {
    var inversions = 0;
    for (var i = 0; i < puzzle.length; i++) {
        for (var j = i + 1; j < puzzle.length; j++) {
            if (puzzle[i] && puzzle[j] && puzzle[i] > puzzle[j]) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0;
}
function loadGame() {
    shuffle();
}

window.addEventListener('click', function (e) {

    //On est sur un Ã©lÃ©ment de classe item (un chiffre)
    if(e.target.className === 'item') {
        var emptyItem = document.querySelector('.empty');

        if(getDistance(e.target.offsetLeft, e.target.offsetTop, emptyItem.offsetLeft, emptyItem.offsetTop) <= 110)
        {
            //On doit intervertir le vide et le chiffre
            emptyItem.className = 'item';
            emptyItem.innerText = e.target.innerText;
            e.target.className = 'empty';
            e.target.innerText = '';

            checkVictory();
        }
    }

});

function getDistance(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}

function checkVictory() {

    var items = document.querySelectorAll('#game>div');
    var score = 0;
    for(var i = 0; i < items.length; i++) {
        if(items[i].innerText === ('' + (i + 1))) {
            score++;
        }
    }

    if(score >= 15) {
        var victoryItem = document.querySelector('.victory');
        victoryItem.style.opacity = "1";
    }
}
