let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

// console.log(boxes)

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = 'O'
const X_TEXT = 'X'
let currentPlayer = X_TEXT

//Create a var to keep track of which box was clicked
let spaces = Array(9).fill(null)
// console.log(spaces)

//create a function that starts the game 

const startGame = () => {
    //this forEach adds an event listener to where if a box (one of the divs in the dom) is clicked it will run boxClicked
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id
    if(!spaces[id]){
        //if the div is empty or = null we are assigning the div the currentPlayer text
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        //created a function that listens for when a player has won 
        if(playerHasWon() !==false) {
            playerText = `${currentPlayer} has won!`
            let winner_blocks = playerHasWon()
            winner_blocks.map(block => boxes[block].style.backgroundColor = winnerIndicator)
            return
        }
        //this statement allows us to change between o and x depending on the current state of current Player this takes affect after a box is clicked 
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

//PLAYER HAS WON

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for(const condition of winningCombos){
        //this restructures the values in winningCombos 
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c]
        }
    }
    return false
}



//RESTART
restartBtn.addEventListener('click', restart)

function restart(){
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()


