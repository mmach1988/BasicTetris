document.addEventListener('DOMContentLoaded', () => {

    // console.log('DOM fully loaded and parsed');
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
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
    console.log('displayshape')
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
        timerId = setInterval(moveDown, 750)
        if(firstTime){
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        firstTime = false
        }
       
        displayShape()
      }
  })

// Pętla for
//Wyświetl  w konsoli (15 razy) text: 'To jest nr: ' numer
// numer od 1-15

for (let i=1; i<16; i++) {
    console.log("To jest nr: " + i);
}




});