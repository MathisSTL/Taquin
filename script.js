var isShuffled = false;

function shuffleAndEnable() {
    if (!isShuffled) {
        shuffle();
        isShuffled = true;

        var items = document.querySelectorAll('.item');
        items.forEach(item => item.classList.add('clickable'));
    }
}

function moveTile(tile) {
    var emptyItem = document.querySelector('.empty');

    if (getDistance(tile.offsetLeft, tile.offsetTop, emptyItem.offsetLeft, emptyItem.offsetTop) <= 110) {
        emptyItem.classList.remove('empty');
        emptyItem.textContent = tile.textContent;
        tile.classList.add('empty');
        tile.textContent = '';

        checkVictory();
    }
}

function getDistance(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}

function checkVictory() {
    var items = document.querySelectorAll('#game>div');
    var score = 0;
    for (var i = 0; i < items.length; i++) {
        if (items[i].innerText === ('' + (i + 1))) {
            score++;
        }
    }

    if (score >= 15) {
        var victoryItem = document.querySelector('.victory');
        victoryItem.style.opacity = "1";
    }
}

// Rest of your code remains unchanged

window.addEventListener('click', function (e) {
    if (isShuffled && e.target.classList.contains('clickable')) {
        moveTile(e.target);
    }
});
