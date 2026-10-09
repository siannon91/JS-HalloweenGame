const pumpkin = document.getElementById('pumpkin');
const candies = document.querySelectorAll('.candy');

let positionX = 100;
let positionY = 100;
const step = 35;
const size = 60;

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
}

function checkCollisions() {
    candies.forEach(candy => {
        



        const candyX = parseFloat(candy.style.left);
        const candyY = parseFloat(candy.style.top);

        if (Math.abs(positionX - candyX) < 40 && Math.abs(positionY - candyY) < 40) {
            candy.style.display === 'none';
        }


    })
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
