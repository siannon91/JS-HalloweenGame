const pumpkin = document.getElementById('pumpkin');
const scoreDisplay = document.getElementById('score');
const candiesContainer = document.getElementById('candies-container');
const monstersContainer = document.getElementById('monsters-container');
const remainingDisplay = document.getElementById('remaining')
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');

let positionX = 100;
let positionY = 100;
const step = 35;
const size = 60;
let score = 0;
let totalCandies = 12;
let totalMonsters = 8;
let remaining = totalCandies;
let isPlaying = false;
let candies = [];
let monsters = [];

const candyTypes = ['🍬', '🍫', '🍭', '🧁', '🍩'];
const monsterTypes = ['👻', '💀', '🧟‍♂️', '🦇'];


function setupBoard() {
    candiesContainer.innerHTML = '';
    monstersContainer.innerHTML = '';
    candies = [];
    monsters = [];

    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 80;

    for (let i = 0; i < totalCandies; i++) {
        const candy = document.createElement('div');
        candy.className = 'candy';
        candy.textContent = candyTypes[Math.floor(Math.random() * candyTypes.length)];

        const x = Math.floor(Math.random() * (maxX - 100)) + 100;
        const y = Math.floor(Math.random() * (maxY - 100)) + 100;

        candy.style.left = x + 'px';
        candy.style.top = y + 'px';

        candiesContainer.appendChild(candy);
        candies.push(candy);
    }

        for (let i = 0; i < totalMonsters; i++) {
        const monster = document.createElement('div');
        monster.className = 'monster';
        monster.textContent = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];

        const x = Math.floor(Math.random() * (maxX - 150)) + 150;
        const y = Math.floor(Math.random() * (maxY - 150)) + 150;

        monster.style.left = x + 'px';
        monster.style.top = y + 'px';

        monstersContainer.appendChild(monster);
        monsters.push(monster);
    }

    remainingDisplay.textContent = remaining;
}

setupBoard();
updatePosition();

function clampPosition() {
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;

    if (positionX < 0) positionX = 0;
    if (positionY < 0) positionY = 0;
    if (positionX > maxX) positionX = maxX;
    if (positionY > maxY) positionY = maxY;
}

function updatePosition() {
    pumpkin.style.left = positionX + 'px';
    pumpkin.style.top = positionY + 'px';

    checkCollisions();
    checkDanger();
}

function checkCollisions() {
    candies.forEach(candy => {
        if (candy.style.display === 'none')
            return;
        

        const pumpkinCenterX = positionX + (size / 2);
        const pumpkinCenterY = positionY + (size / 2);

        const candyX = parseFloat(candy.style.left) + 20;
        const candyY = parseFloat(candy.style.top) + 20;

        const diffX = Math.abs(pumpkinCenterX - candyX);
        const diffY = Math.abs(pumpkinCenterY - candyY);

        if(diffX < 35 && diffY < 35) {
            candy.style.display = 'none';
            score++;
            remaining--;
            scoreDisplay.textContent = score;
            remainingDisplay.textContent = remaining;
        }
    });
}

window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }

    switch (e.key) {
        case 'ArrowUp':
            positionY -= step;
            break;
        case 'ArrowDown' :
            positionY += step;
            break;
        case 'ArrowLeft':
            positionX -= step;
            break;
        case 'ArrowRight':
            positionX += step;
            break;
        default:
            return;

    }

    clampPosition();
    updatePosition();
    })

window.addEventListener('click', (e) => {
    positionX = e.clientX - (size / 2);
    positionY = e.clientY - (size / 2);

    clampPosition();
    updatePosition();

})


window.addEventListener('resize', () => {
    clampPosition();
    updatePosition();
})

function checkDanger() {
    monsters.forEach(monster => {
        const monsterX = parseFloat(monster.style.left);
        const monsterY = parseFloat(monster.style.top);


        if (Math.abs(positionX - monsterX) < 40 && Math.abs(positionY - monsterY) < 40) {
            if (score > 0) {
                score--;
                scoreDisplay.textContent = score;
            }
    
        positionX = 100;
        positionY = 100;
        updatePosition();
        }

    })
}

bgMusic.volume = 0.3;

musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🔇';
        isPlaying = false;
    }
    else {
        bgMusic.play();
        musicBtn.textContent = '🔊';
        isPlaying = true;
    }
})