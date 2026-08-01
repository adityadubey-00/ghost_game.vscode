// 5 OBSTACLE TYPES WITH THEIR EMOJI ICONS & STYLES
const obstacleTypes = [
    { type: 'type-pipe', icon: '🌲' },
    { type: 'type-snake', icon: '🐍' },
    { type: 'type-star', icon: '⭐' },
    { type: 'type-fire', icon: '🔥' },
    { type: 'type-bone', icon: '💀' }
];

function spawnPipe() {
    if (isGameOver) return;

    let topHeight = Math.floor(Math.random() * 220) + 80;
    let bottomHeight = 700 - topHeight - currentGap;

    // Pick 1 random type out of 5
    let randomObstacle = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

    // Create Top Pipe
    const topPipe = document.createElement('div');
    topPipe.classList.add('pipe', 'top-pipe', randomObstacle.type);
    topPipe.style.left = '500px';
    topPipe.style.top = '0px';
    topPipe.style.height = topHeight + 'px';

    // Fill pipe with icons
    let countTop = Math.max(1, Math.floor(topHeight / 40));
    for(let i=0; i<countTop; i++) {
        let span = document.createElement('span');
        span.className = 'pipe-icon';
        span.innerText = randomObstacle.icon;
        topPipe.appendChild(span);
    }
    board.appendChild(topPipe);

    // Create Bottom Pipe
    const bottomPipe = document.createElement('div');
    bottomPipe.classList.add('pipe', 'bottom-pipe', randomObstacle.type);
    bottomPipe.style.left = '500px';
    bottomPipe.style.bottom = '0px';
    bottomPipe.style.height = bottomHeight + 'px';

    // Fill pipe with icons
    let countBottom = Math.max(1, Math.floor(bottomHeight / 40));
    for(let i=0; i<countBottom; i++) {
        let span = document.createElement('span');
        span.className = 'pipe-icon';
        span.innerText = randomObstacle.icon;
        bottomPipe.appendChild(span);
    }
    board.appendChild(bottomPipe);

    pipeTimeout = setTimeout(spawnPipe, spawnDelay);
}
