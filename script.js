const board = document.getElementById('game-board');
const ghost = document.getElementById('ghost');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const welcomeScreen = document.getElementById('welcome-screen');
const menuScreen = document.getElementById('menu-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScore = document.getElementById('final-score');
const bestScoreDisplay = document.getElementById('best-score-display');

let ghostY = 250;
let gravity = 0.30; 
let velocity = 0;
let isGameOver = true;
let score = 0;
let highScore = localStorage.getItem('ghostHighScore') || 0;
highScoreDisplay.innerText = "Best: " + highScore;

let gameInterval;
let treeTimeout;

// MEDIUM GAP (220px - Na zyada bada, na zyada chhota)
let currentSpeed = 1.8;
let currentGap = 220; 
let spawnDelay = 2600;

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

function selectDiff(btn) {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    currentSpeed = parseFloat(btn.dataset.speed);
    
    if (currentSpeed === 1.8) {
        currentGap = 220; // Medium Gap
        spawnDelay = 2600;
    } else if (currentSpeed === 2.8) {
        currentGap = 200;
        spawnDelay = 2200;
    } else {
        currentGap = 185;
        spawnDelay = 1600;
    }
}

function jump() {
    if (!isGameOver) {
        velocity = -5.8;
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
    document.querySelectorAll('.tree').forEach(tree => tree.remove());
    
    ghostY = 250;
    velocity = 0;
    score = 0;
    isGameOver = false;
    
    scoreDisplay.innerText = 'Score: 0';
    welcomeScreen.style.display = 'none';
    menuScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    
    clearTimeout(treeTimeout);
    clearInterval(gameInterval);
    
    gameInterval = setInterval(updateGame, 20);
    spawnTree();
}

function updateGame() {
    velocity += gravity;
    ghostY += velocity;
    ghost.style.top = ghostY + 'px';

    if (ghostY > 590 || ghostY < 0) {
        endGame();
    }

    const trees = document.querySelectorAll('.tree');
    trees.forEach(tree => {
        let treeLeft = parseFloat(tree.style.left);
        treeLeft -= currentSpeed;
        tree.style.left = treeLeft + 'px';

        if (isColliding(ghost, tree)) {
            endGame();
        }

        if (tree.dataset.passed !== 'true' && treeLeft < 30) {
            if (tree.classList.contains('bottom-tree')) {
                score++;
                scoreDisplay.innerText = 'Score: ' + score;
            }
            tree.dataset.passed = 'true';
        }

        if (treeLeft < -70) {
            tree.remove();
        }
    });
}

function spawnTree() {
    if (isGameOver) return;

    let randomHeight = Math.floor(Math.random() * 140) + 80;

    const topTree = document.createElement('div');
    topTree.classList.add('tree', 'top-tree');
    topTree.style.left = '360px';
    topTree.style.top = '0px';
    topTree.style.height = randomHeight + 'px';
    board.appendChild(topTree);

    const bottomTree = document.createElement('div');
    bottomTree.classList.add('tree', 'bottom-tree');
    bottomTree.style.left = '360px';
    bottomTree.style.bottom = '0px';
    bottomTree.style.height = (640 - randomHeight - currentGap) + 'px';
    board.appendChild(bottomTree);

    treeTimeout = setTimeout(spawnTree, spawnDelay);
}

function isColliding(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    let padding = 8;

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
    clearTimeout(treeTimeout);
    
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
