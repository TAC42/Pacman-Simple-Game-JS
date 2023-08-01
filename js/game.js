'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🔘'
const CHERRY = '🍒'
var gGame = {
    score: 0,
    isOn: false,
    maxScore: 0
}
var gBoard
var gIntervalSuper
var gIntervalCherry

// var gMaxScore = 0 

function onInit() {

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    gIntervalCherry = setInterval(addCherry, 15000)

}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.maxScore++


            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.maxScore--
            }
            if (i === 1 && j === 8 ||
                i === 8 && j === 1 ||
                i === 1 && j === 1 ||
                i === 8 && j === 8) {
                board[i][j] = SUPER_FOOD
                gGame.maxScore--
            }
        }
    }
    gGame.maxScore-- // reducing by one to account for Pacmans POS
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom

    // update model
    gGame.score += diff
    // update dom
    document.querySelector('.score').innerText = gGame.score

}

function endGame(isWon) {
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    gGame.isOn = false
    var strHTML = isWon ? `<h1>GAME OVER! YOU WIN! 👑</h1>` : `<h1>GAME OVER! YOU LOSE! 🪦</h1>`

    strHTML += `<button onclick="resetGame()">Play Again</button>`
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
    const elBtn = document.querySelector('.restart')
    elBtn.classList.add('hide')
}
function resetGame() {
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    gGame.score = 0
    gGame.maxScore = 0
    document.querySelector('.score').innerText = gGame.score
    const elBtn = document.querySelector('.restart')
    elBtn.classList.remove('hide')
    onInit()
}
function addCherry() {
    var emptyCell = getEmptyCell()
    if (!emptyCell) return
    //Model
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    //DOM
    var elCell = document.querySelector(`.cell-${emptyCell.i}-${emptyCell.j}`)
    elCell.innerHTML = CHERRY
    gGame.maxScore += 15
    
    setTimeout(() => {
        if(elCell.innerHTML !== CHERRY) return

        console.log('elCell.innerHTML:', elCell.innerHTM);
        //Model
        gBoard[emptyCell.i][emptyCell.j] = EMPTY
        //DOM
        elCell.innerHTML = EMPTY
        gGame.maxScore -= 15
    }, 3000);
}



