const fruits = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉', '🍍', '🥝'];
let board = document.getElementById('game-board');
let message = document.getElementById('message');
let cards = [];
let flipped = [];
let matchedCount = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  let gameFruits = shuffle([...fruits, ...fruits]);
  gameFruits.forEach((fruit, index) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.fruit = fruit;
    card.innerText = '';
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
    cards.push(card);
  });
}

function flipCard(card) {
  if (flipped.length < 2 && !card.classList.contains('matched') && !flipped.includes(card)) {
    card.innerText = card.dataset.fruit;
    flipped.push(card);
    if (flipped.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  if (card1.dataset.fruit === card2.dataset.fruit) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCount++;
    message.innerText = getMessage();
  } else {
    card1.innerText = '';
    card2.innerText = '';
  }
  flipped = [];
}

function getMessage() {
  const messages = ['¡Bien hecho!', '¡Excelente!', '¡Increíble!', '¡Sos un genio!'];
  return messages[Math.min(matchedCount, messages.length - 1)];
}

createBoard();
