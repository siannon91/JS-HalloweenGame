const pumpkin = document.getElementById('pumpkin');

let positionX = 100;
let positionY = 100;
const step = 35;
const size = 60;

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
    })