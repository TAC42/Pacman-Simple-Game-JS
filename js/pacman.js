'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    // DONE: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // game is won!
    if (gGame.score === gGame.maxScore) {
        endGame(true)
        return
    }
    // DONE: hitting a ghost? call endGame or Super
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)

        } else {
            endGame(false)
            return
        }
    }
    // When you hit SUPER_FOOD
    if (nextCell === SUPER_FOOD && !gPacman.isSuper) {
        gPacman.isSuper = true
        setSuperMode()
    }else if(nextCell === SUPER_FOOD && gPacman.isSuper) return

    if (nextCell === CHERRY) {
        gGame.score += 15
    }

    if (nextCell === FOOD) updateScore(1)


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}
function setSuperMode() {

    gGhostFreq = 500

    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = '#00008B'
    }
    setTimeout(() => {
        gPacman.isSuper = false
        gGhostFreq = 1000
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = getRandomColor()
        }
    }, 5000);
}

