'use strict';

// Array representing the cards in the game
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

// Duplicate the cards to create pairs, then shuffle the deck
var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

// Variables to track guesses and game state
var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;  // Time delay for flipping back non-matching cards

// Game container
var game = document.getElementById('game');

// Add game title and style it
var title = document.createElement('h1');
title.textContent = 'Memory Game';
title.style.textAlign = 'center';
title.style.margin = '20px 0';
title.style.fontSize = '2em';
game.style.display = 'flex';
game.style.flexDirection = 'column';
game.style.alignItems = 'center';
game.style.justifyContent = 'center';
game.appendChild(title);

// Add reset button
var resetButton = document.createElement('button');
resetButton.textContent = 'Restart Game';
resetButton.setAttribute('class', 'reset-button');
resetButton.style.margin = '10px';
game.appendChild(resetButton);

// Add grid container for the game cards
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
grid.style.display = 'grid';
grid.style.gridTemplateColumns = 'repeat(4, 100px)';
grid.style.gridGap = '10px';
game.appendChild(grid);

// Function to create the board with shuffled cards
function createBoard() {
  grid.innerHTML = '';  // Clear any existing grid
  gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
  });

  // Loop through the shuffled cards and create card elements
  gameGrid.forEach(function (item) {
    var name = item.name,
        img = item.img;

    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;
    card.style.width = '100px';
    card.style.height = '100px';
    card.style.position = 'relative';
    card.style.cursor = 'pointer';

    // Front of the card (hidden initially)
    var front = document.createElement('div');
    front.classList.add('front');
    front.style.width = '100%';
    front.style.height = '100%';
    front.style.backgroundColor = '#ddd';

    // Back of the card (displays the image)
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';
    back.style.width = '100%';
    back.style.height = '100%';
    back.style.backgroundSize = 'cover';

    // Add hover effect on card
    card.addEventListener('mouseover', function () {
      if (!card.classList.contains('selected') && !card.classList.contains('match')) {
        front.style.backgroundColor = '#bbb';  // Change color on hover
      }
    });

    card.addEventListener('mouseleave', function () {
      if (!card.classList.contains('selected') && !card.classList.contains('match')) {
        front.style.backgroundColor = '#ddd';  // Reset color when hover ends
      }
    });

    // Append front and back to card element
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
}

// Initialize the game board by calling the createBoard function
createBoard();

// Event listener for clicking cards
grid.addEventListener('click', function (event) {
  var clicked = event.target;

  // Prevent invalid clicks (clicking on the grid itself or already flipped/matched cards)
  if (
    clicked.nodeName === 'SECTION' || 
    clicked === previousTarget || 
    clicked.parentNode.classList.contains('selected') || 
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    const card = clicked.parentNode;
    card.classList.add('flipped');  // Flip the card to show its face

    if (count === 1) {
      firstGuess = card.dataset.name;
      card.classList.add('selected');
    } else {
      secondGuess = card.dataset.name;
      card.classList.add('selected');

      // Check if both guesses match
      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
          // If matched, keep them flipped
          setTimeout(function () {
            var selected = document.querySelectorAll('.selected');
            selected.forEach(function (card) {
              card.classList.add('match');  // Keep matched cards visible
            });
            selected.forEach(function (card) {
              card.classList.remove('selected');  // Remove 'selected' class
            });
            resetGuesses();  // Reset guesses
          }, delay);
        } else {
          // If no match, flip back the cards
          setTimeout(function () {
            var selected = document.querySelectorAll('.selected');
            selected.forEach(function (card) {
              card.classList.remove('flipped');  // Flip the card back
              card.classList.remove('selected');  // Remove 'selected' class
            });
            resetGuesses();  // Reset guesses
          }, delay);
        }
      }
    }
    previousTarget = clicked;  // Store the last clicked card
  }
});

// Reset guesses and count
var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
};

// Reset game functionality when the 'Restart Game' button is clicked
resetButton.addEventListener('click', function () {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  grid.innerHTML = '';  // Clear existing grid
  createBoard();  // Recreate the board with shuffled cards
});
