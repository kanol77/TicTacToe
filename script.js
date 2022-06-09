const cells = document.querySelectorAll('.box');
const turnBox = document.querySelector('.current-turn');
const xClass = 'x';
const oClass = 'o';
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

setInterval(() => {
    if(circleTurn) turnBox.innerText = "Current turn of: O";
    else turnBox.innerText = "Current turn of: X";
}, 100);

let pickedSign;

while(pickedSign != 'X' && pickedSign != 'O'){
    pickedSign = prompt("Chose your sign (X or O):")   
}

let circleTurn;

if(pickedSign=='X') circleTurn = false;
else if(pickedSign=='O') circleTurn = true;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, {once:true});
})

function handleClick(e){
    const cell = e.target;
    let currentClass = null;
    if(circleTurn){
        currentClass = oClass;
    }
    else{
        currentClass = xClass;
    }

    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        alert(currentClass.toUpperCase() + ' is the Winner!');
        window.location.reload();
    }
    if(checkDraw()){
        alert("It's a draw!");
        window.location.reload();
    }
    changeTurn();
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function changeTurn(){
    circleTurn = !circleTurn;
}

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}

function checkDraw(){
    let counter = 0;
    cells.forEach(cell =>{
        if(cell.classList.contains('x') || cell.classList.contains('o')) counter+=1;
    })

    if(counter == 9) return true;
    else return false;
}