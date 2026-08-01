const board = document.getElementById('game-board');
const ghost = document.getElementById('ghost');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const welcomeScreen = document.getElementById('welcome-screen');
const menuScreen = document.getElementById('menu-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScore = document.getElementById('final-score');
const bestScoreDisplay = document.getElementById('best-score-display');

let ghostY = 280;
let gravity = 0.35;
let velocity = 0;
let isGameOver = true;
let score = 0;
let highScore = localStorage.getItem('ghostHighScore') || 0;
highScoreDisplay.innerText = "Best: " + highScore;

let gameInterval;
let obstacleTimeout;

let currentSpeed = 2.5;
let currentGap = 180;
let spawnDelay = 1800;

// Sound Effects
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'jump') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    }
}

function enterGame() {
    welcomeScreen.style.display = 'none';
    menuScreen.style.display = 'flex';
}

function selectSkin(skinName, btn) {
    document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ghost.className = '';
    ghost.classList.add('skin-' + skinName);
}

function selectDiff(btn) {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSpeed = parseFloat(btn.dataset.speed);
    currentGap = parseInt(btn.dataset.gap);
    spawnDelay = 2200 / (currentSpeed / 2);
}

function jump() {
    if (!isGameOver) {
        velocity = -6.5;
        playSound('jump');
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
});
board.addEventListener('mousedown', (e) => {
    if (e.target.tagName !== 'BUTTON') jump();
});

function startGame() {
    document.querySelectorAll('.obstacle').forEach(p => p.remove());
    ghostY = 280;
    velocity = 0;
    score = 0;
    isGameOver = false;

    scoreDisplay.innerText = 'Score: 0';
    welcomeScreen.style.display = 'none';
    menuScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';

    clearTimeout(obstacleTimeout);
    clearInterval(gameInterval);

    gameInterval = setInterval(updateGame, 20);
    spawnObstacle();
}

function updateGame() {
    velocity += gravity;
    ghostY += velocity;
    ghost.style.top = ghostY + 'px';

    if (ghostY > 655 || ghostY < 0) {
        endGame();
    }

    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obs => {
        let obsLeft = parseFloat(obs.style.left);
        obsLeft -= currentSpeed;
        obs.style.left = obsLeft + 'px';

        if (isColliding(ghost, obs)) {
            endGame();
        }

        if (obs.dataset.passed !== 'true' && obsLeft < 40) {
            if (obs.classList.contains('bottom-obs')) {
                score++;
                scoreDisplay.innerText = 'Score: ' + score;
            }
            obs.dataset.passed = 'true';
        }

        if (obsLeft < -80) {
            obs.remove();
        }
    });
}

// 5 OBJECTS LIST
const itemsList = ['🐍', '⭐', '🌲', '🔥', '💀'];

function spawnObstacle() {
    if (isGameOver) return;

    let topHeight = Math.floor(Math.random() * 220) + 80;
    let bottomHeight = 700 - topHeight - currentGap;

    // Select random item for top and bottom
    let randomTopItem = itemsList[Math.floor(Math.random() * itemsList.length)];
    let randomBottomItem = itemsList[Math.floor(Math.random() * itemsList.length)];

    // Top Floating Object
    const topObs = document.createElement('div');
    topObs.classList.add('obstacle', 'top-obs');
    topObs.style.left = '500px';
    topObs.style.top = (topHeight - 30) + 'px';
    topObs.innerText = randomTopItem;
    board.appendChild(topObs);

    // Bottom Floating Object
    const bottomObs = document.createElement('div');
    bottomObs.classList.add('obstacle', 'bottom-obs');
    bottomObs.style.left = '500px';
    bottomObs.style.top = (topHeight + currentGap) + 'px';
    bottomObs.innerText = randomBottomItem;
    board.appendChild(bottomObs);

    obstacleTimeout = setTimeout(spawnObstacle, spawnDelay);
}

function isColliding(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    let padding = 10;

    return !(
        aRect.top + padding > bRect.bottom ||
        aRect.bottom - padding < bRect.top ||
        aRect.right - padding < bRect.left ||
        aRect.left + padding > bRect.right
    );
}

function endGame() {
    if (isGameOver) return;
    isGameOver = true;
    playSound('hit');

    clearInterval(gameInterval);
    clearTimeout(obstacleTimeout);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('ghostHighScore', highScore);
        highScoreDisplay.innerText = "Best: " + highScore;
    }

    finalScore.innerText = "Current Score: " + score;
    bestScoreDisplay.innerText = "High Score: " + highScore;
    gameOverScreen.style.display = 'flex';
}

function showMenu() {
    gameOverScreen.style.display = 'none';
    welcomeScreen.style.display = 'none';
    menuScreen.style.display = 'flex';
}
