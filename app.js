document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM fully loaded and parsed');
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10
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
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

let currentPosition=4
const theTetrominos = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]
let current = theTetrominos[0][1]

function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino")
    })
}
draw()

    let imiona = ["Maciek","Tomek","Kuba","Ania"]
    // for (imie of imiona){
    //     console.log("Hello "+imie)
    // }

    imiona.forEach(imie => {
        console.log("Hello "+imie)
    })
});