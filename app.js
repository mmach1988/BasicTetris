document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM fully loaded and parsed');
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10
    let timerId
    let nextRandom = 0
    // console.log(squares)

const lTetromino = [
    [1,width+1,width*2+1,2],
    [width,width+1,width+2,width*2+2],
    [1,width+1,width*2+1,width*2],
    [width,width*2,width*2+1,width*2+2]
]

const zTetromino = [
    [width*2,width+1,width*2+1,width+2],
    [0,width,width+1,width*2+1],
    [width*2,width+1,width*2+1,width+2],
    [0,width,width+1,width*2+1]
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
    currentRotation++
    current = theTetrominoes[random][currentRotation]
    draw()
    freeze()
}

setInterval(moveDown, 200)

// document.addEventListener('keyup', control)
// function control(e) {
// }

function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start new tetromino
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][0]
        currentPosition =4
        draw()
}
}

});