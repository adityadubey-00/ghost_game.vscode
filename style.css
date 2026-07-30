* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    user-select: none;
}

body {
    background-color: #0d0d1a;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

#game-board {
    width: 360px;
    height: 640px;
    background: linear-gradient(to bottom, #110022, #220033, #330044);
    position: relative;
    overflow: hidden;
    border: 4px solid #8800cc;
    box-shadow: 0 0 25px rgba(136, 0, 204, 0.5);
    border-radius: 12px;
}

/* Character */
#ghost {
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 50% 50% 10% 10%;
    position: absolute;
    left: 60px;
    top: 250px;
    box-shadow: 0 0 15px #ffffff, 0 0 30px #bb00ff;
    z-index: 5;
}

/* Ghost Eyes */
#ghost::before, #ghost::after {
    content: '';
    position: absolute;
    top: 10px;
    width: 6px;
    height: 8px;
    background-color: #000;
    border-radius: 50%;
}
#ghost::before { left: 10px; }
#ghost::after { right: 10px; }

/* Trees / Obstacles */
.tree {
    position: absolute;
    width: 60px;
    background: linear-gradient(to right, #004d00, #008000, #003300);
    border: 2px solid #00ff66;
    box-shadow: 0 0 10px rgba(0, 255, 102, 0.3);
    z-index: 2;
}

.top-tree {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.bottom-tree {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

/* Scores */
#score, #high-score {
    position: absolute;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    z-index: 10;
    text-shadow: 0 0 5px #000;
}
#score { top: 15px; left: 15px; }
#high-score { top: 15px; right: 15px; color: #ffcc00; }

/* Overlays / Screens */
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 0, 20, 0.85);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 20;
    color: white;
    text-align: center;
    padding: 20px;
}

.overlay h1 {
    font-size: 32px;
    color: #cc33ff;
    text-shadow: 0 0 10px #cc33ff;
    margin-bottom: 10px;
}

.overlay p {
    font-size: 16px;
    color: #ccc;
    margin-bottom: 20px;
}

/* Buttons */
.btn {
    padding: 12px 28px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(45deg, #8800cc, #bb00ff);
    border: none;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(187, 0, 255, 0.6);
    transition: transform 0.1s, background 0.2s;
    margin: 5px;
}

.btn:active {
    transform: scale(0.95);
}

.diff-container {
    display: flex;
    gap: 8px;
    margin-bottom: 25px;
}

.diff-btn {
    padding: 8px 12px;
    font-size: 13px;
    font-weight: bold;
    background: #220033;
    color: #aaa;
    border: 2px solid #550088;
    border-radius: 8px;
    cursor: pointer;
}

.diff-btn.active {
    background: #8800cc;
    color: #fff;
    border-color: #00ff66;
    box-shadow: 0 0 8px #00ff66;
}

.btn-group {
    display: flex;
    gap: 10px;
}

.menu-btn-style {
    background: linear-gradient(45deg, #444, #666);
    box-shadow: none;
}
