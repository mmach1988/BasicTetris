document.addEventListener('DOMContentLoaded', () => {

    // console.log('DOM fully loaded and parsed');
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let score = 0;
    let timerId
    let nextRandom = 0
    let firstTime = true
    // console.log(squares)

   //tetriminoes
const lTetromino = [
  [1,width+1,width*2+1,2],
  [width,width+1,width+2,width*2+2],
  [1,width+1,width*2+1,width*2],
  [width,width*2,width*2+1,width*2+2]
]

const zTetromino = [
  [0,width,width+1,width*2+1],
  [width+1,width+2,width*2,width*2+1],
  [0,width,width+1,width*2+1],
  [width+1,width+2,width*2,width*2+1]
]

const tTetromino = [
  [1,width,width+1,width+2],
  [1,width+1,width+2,width*2+1],
  [width,width+1,width+2,width*2+1],
  [1,width,width+1,width*2+1]
]

const oTetromino = [
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1]
]

const iTetromino = [
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3],
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3]
]

const theTetrominoes = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]
let currentPosition=4
let currentRotation = 0
let random=Math.floor(Math.random()*theTetrominoes.length)
let current = theTetrominoes[random][currentRotation]
let obrot = true

function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino")
    })
}

function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino")
    })
}

function moveDown() {
    undraw()
    currentPosition+=width
    draw()
    freeze()
}

function moveRight() { 
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index)%width===9)
    if(!isAtRightEdge) currentPosition +=1
    draw()
    console.log('W prawo') 
}

function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index)%width===0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition++
    }
    draw()
}

function rotate() {
    undraw()
    currentRotation++
    if(currentRotation === current.length) {
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

// function checkRotatedPosition() {
//     obrot = true
//     if(currentRotation===2) {
//         obrot=false
//     }
//     if(!obrot) {
//         if(currentRotation===0) {
//             currentRotation=3
//         }
//         else {
//             currentRotation--
//         }
//     }
// }

// setInterval(moveDown, 250)
clearInterval

document.addEventListener('keyup', control)
function control(e) {
    if(e.keyCode===37){
        moveLeft()
    }    

    if(e.keyCode===38){
        rotate()
    }   

    if(e.keyCode===39){
        moveRight()
    }   
}

function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start new tetromino
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][0]
        currentPosition =4
        draw()
        displayShape()
        addScore()
        gameOver()
}
}

const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0
const upNextTetrominoes =  [
    [1,displayWidth+1,displayWidth*2+1,2],
    [0,displayWidth,displayWidth+1,displayWidth*2+1],
    [1,displayWidth,displayWidth+1,displayWidth+2],
    [0,1,displayWidth,displayWidth+1],
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
]

function displayShape() {
    displaySquares.forEach(square => {
    square.classList.remove('tetromino')
    })

    upNextTetrominoes[nextRandom].forEach(index => {
        displaySquares[index].classList.add('tetromino')
    })
}

startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
      } else {
        draw()
        timerId = setInterval(moveDown, 500)
        if(firstTime){
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        firstTime = false
        }
       
        displayShape()
      }
  })

function addScore() {
    for (let i = 0; i <199; i+=width) {
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

    if(row.every(index => squares[index].classList.contains('taken'))) {
score+=10
scoreDisplay.innerHTML = score
row.forEach(index => {
    squares[index].classList.remove('taken')
    squares[index].classList.remove('tetromino')

})
const squaresRemoved = squares.splice(i, width)
squares = squaresRemoved.concat(squares)
squares.forEach(cell => grid.appendChild(cell))
    }
    }
}

function gameOver() {
    console.log('Czy game over?')
    if(current.some(index => squares[index+currentPosition].classList.contains('taken'))) {
        console.log('Tak, game over')
        scoreDisplay.innerHTML = ' ' + score + ' Game Over'
        clearInterval(timerId)
        console.log('Interval cleared')

    }
    else {
        console.log('NIE')
    }

}

});