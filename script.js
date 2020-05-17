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
let possible_win_combo = [];
Winning_Combinations.forEach(c =>
    possible_win_combo.push(combinations(c).filter(a => a.length == 2)));
const number = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
            setTimeout(placeCircleMark(currentClass), 700)
        }
    }

}
function isGameDraw(draw) {
    if (draw) {
        Winning_Message_Text.innerHTML = 'Draw!'
    } else {
        Winning_Message_Text.innerHTML = `${circleTurn ? "O's" : "You"} Win!`
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

const placeCircleMark = (currentClass) => {
    let xIndexs = findXIndex();
    let circleIndexs = findCircleIndex();
    let numberTemp = [...number];
    numberTemp = numberTemp.filter(e => ![...xIndexs, ...circleIndexs].includes(e))
    let random = numberTemp[Math.floor(Math.random() * (numberTemp.length - 1))];
    //circle strategy
    if (numberTemp.includes(4)) {
        random = 4;
    }
    else if (xGoingToWin(xIndexs)) {
        //random ==winningpossibleIndex
        /* const possible = Winning_Combinations.find(item => item.filter(i => !xIndexs.includes(i)));
        const index = possible.filter(item => !xIndexs.includes(item));
        if (!numberTemp.includes(index)) {
            random = parseInt(index.toString());
            Winning_Combinations.splice(Winning_Combinations.indexOf(possible), 1); */
    }

    numberTemp.splice(numberTemp.indexOf(random), 1)
    cellElements[random].classList.add(circle_class);
    console.log("number", numberTemp, "random", random)
    if (checkWin(circle_class)) {
        isGameDraw(false);
    } else if (isDraw()) {
        isGameDraw(true);
    }
    swapTurns();
    setBoardHoverClass();


}
function findXIndex() {
    return [...cellElements].map((cell, index) =>
        cell.classList.contains(x_class) ? index : '').filter(String)
}
function findCircleIndex() {
    return [...cellElements].map((cell, index) =>
        cell.classList.contains(circle_class) ? index : '').filter(String)
}
function xGoingToWin(xIndexs) {
    //check if x insists in possible combo
    return possible_win_combo.some(combo =>
        combo.some(c => c.every(x => xIndexs.includes(x))))
}
function combinations(array) {
    return new Array(1 << array.length).fill().map(
        (e1, i) => array.filter((e2, j) => i & 1 << j));
}
startGame();
restart.addEventListener('click', startGame);