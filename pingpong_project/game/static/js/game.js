const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 100;
const paddleWidth = 10;
const ballRadius = 5;

let player1Score = 0;
let player2Score = 0;

let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function drawPaddle(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function updateGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    drawPaddle(0, paddle1Y);
    drawPaddle(canvas.width - paddleWidth, paddle2Y);

    // Draw ball
    drawBall();

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
        (ballX - ballRadius < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) ||
        (ballX + ballRadius > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Scoring
    if (ballX < 0) {
        player2Score++;
        resetBall();
    } else if (ballX > canvas.width) {
        player1Score++;
        resetBall();
    }

    // Update score display
    document.getElementById('player1Score').textContent = player1Score;
    document.getElementById('player2Score').textContent = player2Score;

    requestAnimationFrame(updateGame);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() > 0.5 ? 5 : -5;
}

// Move paddles with arrow keys and W/S keys
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            paddle1Y = Math.max(paddle1Y - 20, 0);
            break;
        case 's':
            paddle1Y = Math.min(paddle1Y + 20, canvas.height - paddleHeight);
            break;
        case 'ArrowUp':
            paddle2Y = Math.max(paddle2Y - 20, 0);
            break;
        case 'ArrowDown':
            paddle2Y = Math.min(paddle2Y + 20, canvas.height - paddleHeight);
            break;
    }
});

updateGame();