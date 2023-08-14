var grid = document.querySelector(".grid");
var special = document.querySelector(".special");
var items;
var rang = [4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1];

// melange et test
function melangeTest() {
  // je mélange
  for (var i = grid.children.length; i >= 0; i--) {
    grid.appendChild(grid.children[(Math.random() * i) | 0]);
  }
  
  items = document.querySelectorAll(".grid>div");

  // je teste
  var melange = 0;
  var pos;

  for (var i = 0; i <= 15; i++) {
    if (Number(items[i].dataset.n) === 16) {
      pos = rang[i];
    }
    for (var j = i + 1; j <= 15; j++) {
      let a = Number(items[i].dataset.n);
      let b = Number(items[j].dataset.n);
      if (a > b) {
        if (a !== 16 && b !== 16) {
          melange++;
        } // if
      } // if
    } // for j
  } // for i
  if((pos + melange)%2 === 0){
    // on remélange
    melangeTest();
  }else{
    console.log(pos,melange);
  }
} // function

melangeTest();



TweenMax.set(".grid>div", {
  x: function(i) {
    return (i % 4) * 100;
  },
  y: function(i) {
    return Math.floor(i / 4) * 100;
  }
});

function distance(r1, r2) {
  var a = r1.x - r2.x;
  var b = r1.y - r2.y;
  return Math.sqrt(a * a + b * b);
}

grid.addEventListener("click", function(e) {
  if (e.target.className === "item") {
    let sRect = special._gsTransform;
    let tRect = e.target._gsTransform;
    if (distance(sRect, tRect) <= 100) {
      TweenMax.to(".special", 0.2, {
        x: tRect.x,
        y: tRect.y
      });
      TweenMax.to(e.target, 0.2, {
        x: sRect.x,
        y: sRect.y,
        onComplete: checkLaWin
      });
    } // fin du if distance
  } // fin du if target
});

function checkLaWin() {
  var score = 0;
  for (var i = 0; i < items.length; i++) {
    let n = Number(items[i].dataset.n) - 1;
    if (
      items[i]._gsTransform.x === (n % 4) * 100 &&
      items[i]._gsTransform.y === Math.floor(n / 4) * 100
    ) {
      score++;
    }
  }
  if (score === 16) {
    var tl = new TimelineMax();
    tl.fromTo(".win", 0.4, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1 });
    tl.staggerTo(
      ".grid>div",
      2,
      {
        opacity: 0,
        rotation: function() {
          return Math.random() * 720;
        },
        x: function() {
          return Math.random() * 1000 + 1000 * (Math.random() > 0.5 ? -1 : 1);
        },
        y: function() {
          return Math.random() * 1000 + 1000 * (Math.random() > 0.5 ? -1 : 1);
        },
        ease: Power4.easeOut
      },
      0.01
    );
  }
}
