const pumpkin = document.getElementById('pumpkin');

let positionX = 100;
let positionY = 100;
const step = 35;
const size = 60;

function clampPosition() {
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;

    if (positionX < 0) positionX = 0;
    if (positionY < 0) positionY = 0;
    if (positionX > maxX) positionX = maxX;
    if (positionY > maxY) positionY = maxY;
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
    })

