# MemoryGame
# ⭐ JavaScript Memory Game

This project is a Memory Game implemented using HTML, CSS, and JavaScript. The game dynamically generates a grid of cards with matching pairs. Players can reveal two cards per turn to find a match, and the game continues until all pairs are found. The project also includes functionality to reset and restart the game.

Features

- Display 12 cards.
- Duplicate the cards to have 2 sets of 12.
- Randomize the display of cards.
- Add selected style for selected cards.
- Only allow two cards to be selected at a time.
- Determine if two selected cards are a match and hide them.
- Reset guess count after 2.
- Add delay to selections.
- Show back of card initially and flip on select
- Finished game!

Dynamic Grid: A grid of cards is generated dynamically using JavaScript.

Matching Logic: Flip two cards to find matching pairs.

Reset Button: Restart the game at any time.

Responsive Design: Game is centered and visually appealing on various screen sizes.

Tech Stack

HTML: Provides the structure of the game.

CSS: Styles the grid, cards, and other elements.

JavaScript: Handles game logic, card flipping, and matching.

JsDom: Used for testing the DOM interactions in a Node.js environment.

Setup

Prerequisites

A modern web browser.

Node.js and npm (for running tests with JsDom).

Installation

Clone the repository:

git clone <repository_url>
cd memory-game

Open the index.html file in your browser to play the game.

File Structure

memory-game/
├── index.html       # HTML structure
├── styles.css       # CSS styles
├── script.js        # Game logic
├── game.test.js     # JsDom test file
└── README.md        # Project documentation

Usage

Open the game in a browser.

Flip two cards by clicking on them.

If the cards match, they remain revealed. If not, they flip back.

Continue until all pairs are matched.

Click the "Restart Game" button to reset the game.

Testing

Run Tests with JsDom

Install JsDom:

npm install jsdom

Run tests using Jest:

npx jest game.test.js

Screenshots

Initial Layout



During Gameplay



(Note: Replace # with the actual image paths if applicable.)

Future Enhancements

Add animations for card flips.

Implement a timer to track how long the game takes to complete.

Add levels with varying grid sizes.

License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.

Author

Rajeshkumar Gopalan 
Email: rktechappcode@gmail.com
GitHub: https://github.com/Rajeshkumar-G-FSD

