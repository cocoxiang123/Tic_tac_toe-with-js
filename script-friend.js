const x_class = "x";
const circle_class = "circle";
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const Winning_Message = document.querySelector('.winning-message');
const Winning_Message_Text = document.querySelector('[data-winning-message-text]')
const restart = document.getElementById('restartButton');
const Winning_Combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn;


function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass();
    Winning_Message.classList.remove('show');
}
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circle_class : x_class;
    //placemark
    placeMark(cell, currentClass);
    //checkforwin
    //checkfordraw
    if (checkWin(currentClass)) {
        isGameDraw(false);
    } else if (isDraw()) {
        isGameDraw(true);
    }
    else {
        //switch turns
        swapTurns();
        setBoardHoverClass();
        if (circleTurn) {
            setInterval(placeCircleMark, 2000)
        }
    }

}
function isGameDraw(draw) {
    if (draw) {
        Winning_Message_Text.innerHTML = 'Draw!'
    } else {
        Winning_Message_Text.innerHTML = `${circleTurn ? "O's" : "X's"} Wins`
    }
    Winning_Message.classList.add('show');
}
const isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
}

const placeMark = (cell, currentClass) =>
    cell.classList.add(currentClass);

const swapTurns = () => {
    circleTurn = !circleTurn;

}

const setBoardHoverClass = () => {
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if (circleTurn) {
        board.classList.add(circle_class);
    }
    else {
        board.classList.add(x_class);
    }

}
const checkWin = (currentClass) => {
    return Winning_Combinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

const placeCircleMark = () => {
    cellElements.filter(cell => {
        return cell.classList != x_class || cell.classList != circle_class;
    })
}

startGame();
restart.addEventListener('click', startGame);