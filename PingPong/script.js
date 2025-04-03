
let playGame = false;
let animatedFrameId;
let timer = 0;
let timerInterval;
let playerScore = 0;
let aiScore = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 80;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;
let playerSpeed = 0;

let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 3;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY *= -1;
    }

    if (ballX <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight) {
        ballSpeedX *= -1;
    }

    if (ballX >= canvas.width - paddleWidth && ballY >= aiY && ballY <= aiY + paddleHeight) {
        ballSpeedX *= -1;
    }

    if (ballX < 0) {
        playerScore++;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 5;
        ballSpeedY = (Math.random() * 4 - 2);
    }

    if (ballX > canvas.width) {
        aiScore++;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -5;
        ballSpeedY = (Math.random() * 4 - 2);
    }
    playerY += playerSpeed;
    if (playerY < 0) playerY = 0;
    if (playerY + paddleHeight > canvas.height) playerY = canvas.height - paddleHeight;

    aiY += (ballY - (aiY + paddleHeight / 2)) * 0.05;
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawRect(0, playerY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "white");
    drawBall(ballX, ballY, 8, "red");
}

function gameLoop() {
    if (!playGame) return;
    update();
    draw();
    animatedFrameId = requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") playerSpeed = -5;
    if (event.key === "ArrowDown") playerSpeed = 5;
});

window.addEventListener("keyup", (event) => {
    playerSpeed = 0;
});

function updateTimer() {
    document.querySelector(".timer").innerText = timer;
    timer++;
}
function startGame() {
    if (!playGame) {
        playGame = true;
        timer = 0;
        document.querySelector(".timer").innerText = timer;
        timerInterval = setInterval(updateTimer, 1000);
        gameLoop();
    }
}
function stopGame() {
    playGame = false;
    cancelAnimationFrame(animatedFrameId);
    clearInterval(timerInterval);
}