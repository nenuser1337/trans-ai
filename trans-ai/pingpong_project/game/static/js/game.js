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

let isGameRunning = false;

function drawPaddle(x, y) {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, 3 * canvas.width / 4, 50);
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw game elements
    drawPaddle(0, paddle1Y);
    drawPaddle(canvas.width - paddleWidth, paddle2Y);
    drawBall();
    drawScore();

    if (isGameRunning) {
        // Update ball position
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

        // Check for game end
        if (player1Score >= 11 || player2Score >= 11) {
            endGame();
        }
    }

    // Continue the game loop
    requestAnimationFrame(draw);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() > 0.5 ? 5 : -5;
}

document.addEventListener('keydown', (e) => {
    if (!isGameRunning) return;
    const key = e.key.toLowerCase();
    if (key === 'w' && paddle1Y > 0) {
        paddle1Y -= 20;
    } else if (key === 's' && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += 20;
    } else if (key === 'arrowup' && paddle2Y > 0) {
        paddle2Y -= 20;
    } else if (key === 'arrowdown' && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += 20;
    }
});

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        player1Score = 0;
        player2Score = 0;
        resetBall();
        paddle1Y = canvas.height / 2 - paddleHeight / 2;
        paddle2Y = canvas.height / 2 - paddleHeight / 2;
        document.getElementById('startGameBtn').style.display = 'none';
        document.getElementById('endGameBtn').style.display = 'inline-block';
        // Ensure the game loop is running
        draw();
    }
}

function endGame() {
    isGameRunning = false;
    document.getElementById('startGameBtn').style.display = 'inline-block';
    document.getElementById('endGameBtn').style.display = 'none';
    const winner = player1Score > player2Score ? document.getElementById('player1Name').textContent : document.getElementById('player2Name').textContent;
    alert(`Game Over! ${winner} wins!`);
    endMatch(winner);
}

function resetGameState() {
    isGameRunning = false;
    player1Score = 0;
    player2Score = 0;
    paddle1Y = canvas.height / 2 - paddleHeight / 2;
    paddle2Y = canvas.height / 2 - paddleHeight / 2;
    resetBall();
    document.getElementById('startGameBtn').style.display = 'inline-block';
    document.getElementById('endGameBtn').style.display = 'none';
    document.getElementById('player1Score').textContent = '0';
    document.getElementById('player2Score').textContent = '0';
}

document.getElementById('startGameBtn').addEventListener('click', startGame);
document.getElementById('endGameBtn').addEventListener('click', endGame);

draw();