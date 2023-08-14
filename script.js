function shuffle() {
    var grid = document.getElementById('game');
    var items = Array.from(grid.children);
    var emptyItem = document.querySelector('.empty');

    for (var i = 0; i < 100; i++) {
        var neighbors = getNeighbors(emptyItem);
        var randomIndex = Math.floor(Math.random() * neighbors.length);
        var randomNeighbor = neighbors[randomIndex];
        
        emptyItem.className = 'item';
        emptyItem.innerText = randomNeighbor.innerText;
        randomNeighbor.className = 'empty';
        randomNeighbor.innerText = '';

        emptyItem = randomNeighbor;
    }
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
