// Initialize canvas
// More comments
const canvas = document.getElementById('gameCanvas'); // Get the game canvas element
const ctx = canvas.getContext('2d'); // Get the 2D rendering context for drawing on the canvas

// Set canvas size
//canvas.width = Math.floor(window.innerWidth / snakeSize) * snakeSize;
//canvas.height = Math.floor(window.innerHeight / snakeSize) * snakeSize;

// Set initial snake position
let snake = [{x: 20, y: 20}]; // The snake is represented as an array of segments, each with an x and y coordinate
let dx = 0; // The change in x-coordinate for each game loop (controls direction)
let dy = 0; // The change in y-coordinate for each game loop (controls direction)
const snakeSize = 20; // The size of each snake segment

// Set initial food position
let food = getRandomPosition(); // The food's position is a random point on the canvas

// Set initial game state
let score = 0; // The player's score, initially 0

// Set initial game speed
let speed = 200; // The speed of the game, initially 100ms per game loop

// Main game loop
function gameLoop() {
  setTimeout(() => { // This function runs every 'speed' milliseconds
    clearCanvas(); // Clear the canvas for the new frame
    moveSnake(); // Move the snake to its new position
    drawSnake(); // Draw the snake in its new position
    drawFood(); // Draw the food
    checkCollision(); // Check if the snake has collided with itself or the edge of the canvas
    checkFood(); // Check if the snake has eaten the food
    gameLoop(); // Repeat the game loop
  }, speed);
}

// Clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
}

// Draw snake
function drawSnake() {
  ctx.fillStyle = 'green'; // Set the color to draw the snake
  snake.forEach(segment => { // For each segment of the snake
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize); // Draw a rectangle at the segment's position
  });
}

// Move snake
function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy}; // Calculate the new position of the snake's head
  snake.unshift(head); // Add the new head to the front of the snake
  if (head.x === food.x && head.y === food.y) { // If the snake's head is at the food's position
    score += 10; // Increase the score
    updateScore(); // Update the score display
    speed -= 2; // Increase the game speed
    food = getRandomPosition(); // Move the food to a new random position
  } else {
    snake.pop(); // If the snake didn't eat food, remove the last segment of the snake
  }
}

// Draw food
function drawFood() {
  ctx.fillStyle = 'red'; // Set the color to draw the food
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize); // Draw a rectangle at the food's position
}

/**
 * Updates the score display on the webpage.
 * 
 * This function retrieves the score element from the HTML document by its ID,
 * and updates its inner text to display the current score.
 */
function updateScore() {
  // Get the score element from the HTML document
  const scoreElement = document.getElementById('score');

  // Update the inner text of the score element to display the current score
  scoreElement.innerText = 'Score: ' + score;
}

// Get random position for food
function getRandomPosition() {
  while (true) {
    const x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize; // Calculate a random x-coordinate for the food
    const y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize; // Calculate a random y-coordinate for the food
    let position = {x, y}; // New position

    // Check if the new position is within the snake
    if (!snake.some(segment => segment.x === position.x && segment.y === position.y)) {
      return position; // If it's not within the snake, return the new position
    }
    // If it is within the snake, the loop will continue and generate a new position
  }
}

// Check collision with walls or self
function checkCollision() {
  const head = snake[0]; // Get the position of the snake's head
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) { // If the head is outside the canvas
    gameOver(); // End the game
  }
  for (let i = 1; i < snake.length; i++) { // For each segment of the snake (excluding the head)
    if (head.x === snake[i].x && head.y === snake[i].y) { // If the head is at the same position as the segment
      gameOver(); // End the game
    }
  }
}

// Check if snake eats food
function checkFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) { // If the snake's head is at the food's position
    score += 10; // Increase the score
    speed -= 2; // Increase the game speed
    food = getRandomPosition(); // Move the food to a new random position
  }
}

// Game over
function gameOver() {
  alert('Game Over! Your score: ' + score); // Show an alert with the final score
  location.reload(); // Reload the page to restart the game
}

// Handle key press events
document.addEventListener('keydown', e => { // When a key is pressed
  switch (e.key) { // Depending on the key
    case 'ArrowUp': // If the up arrow key was pressed
      if (dy !== snakeSize) { // And the snake is not moving down
        dx = 0; // Stop moving horizontally
        dy = -snakeSize; // Start moving up
      }
      break;
    case 'ArrowDown': // If the down arrow key was pressed
      if (dy !== -snakeSize) { // And the snake is not moving up
        dx = 0; // Stop moving horizontally
        dy = snakeSize; // Start moving down
      }
      break;
    case 'ArrowLeft': // If the left arrow key was pressed
      if (dx !== snakeSize) { // And the snake is not moving right
        dx = -snakeSize; // Start moving left
        dy = 0; // Stop moving vertically
      }
      break;
    case 'ArrowRight': // If the right arrow key was pressed
      if (dx !== -snakeSize) { // And the snake is not moving left
        dx = snakeSize; // Start moving right
        dy = 0; // Stop moving vertically
      }
      break;
  }
});

// Start the game
gameLoop(); // Start the game loop