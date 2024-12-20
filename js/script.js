'use strict';

var cardsArray = [{
  'name': 'shell',
  'img': 'img/blueshell.png'
}, {
  'name': 'star',
  'img': 'img/star.png'
}, {
  'name': 'bobomb',
  'img': 'img/bobomb.png'
}, {
  'name': 'mario',
  'img': 'img/mario.png'
}, {
  'name': 'luigi',
  'img': 'img/luigi.png'
}, {
  'name': 'peach',
  'img': 'img/peach.png'
}, {
  'name': '1up',
  'img': 'img/1up.png'
}, {
  'name': 'mushroom',
  'img': 'img/mushroom.png'
}, {
  'name': 'thwomp',
  'img': 'img/thwomp.png'
}, {
  'name': 'bulletbill',
  'img': 'img/bulletbill.png'
}, {
  'name': 'coin',
  'img': 'img/coin.png'
}, {
  'name': 'goomba',
  'img': 'img/goomba.png'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

// Game container
var game = document.getElementById('game');

// Add game title
var title = document.createElement('h1');
title.textContent = 'Memory Game'; // Set title here

// Add styles to center the title
title.style.textAlign = 'center';
title.style.margin = '20px 0';
title.style.fontSize = '2em';
game.style.display = 'flex';
game.style.flexDirection = 'column';
game.style.alignItems = 'center';
game.style.justifyContent = 'center';

// Append the title to the game container
game.appendChild(title);

// Add reset button
var resetButton = document.createElement('button');
resetButton.textContent = 'Restart Game';
resetButton.setAttribute('class', 'reset-button');
resetButton.style.margin = '10px';
game.appendChild(resetButton);

// Add grid
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
grid.style.display = 'grid';
grid.style.gridTemplateColumns = 'repeat(4, 100px)';
grid.style.gridGap = '10px';
game.appendChild(grid);

// Create and initialize the board
function createBoard() {
  grid.innerHTML = ''; // Clear existing grid
  gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
  });
  gameGrid.forEach(function (item) {
    var name = item.name,
        img = item.img;

    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;
    card.style.width = '100px';
    card.style.height = '100px';
    card.style.position = 'relative';

    var front = document.createElement('div');
    front.classList.add('front');
    front.style.width = '100%';
    front.style.height = '100%';

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';
    back.style.width = '100%';
    back.style.height = '100%';
    back.style.backgroundSize = 'cover';

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
}

// Call createBoard to initialize the game
createBoard();

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {
  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});

// Reset game functionality
resetButton.addEventListener('click', function () {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  grid.innerHTML = '';
  createBoard();
});
