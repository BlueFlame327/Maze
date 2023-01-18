const can = document.getElementById("c")
const w = can.width
const h = can.height
const rows = 20
const cols = 20
const ctx = can.getContext("2d")
const grid = Array(rows).fill().map(() => Array(cols))
const cellWidth = w / cols
const cellHeight = h / rows

class Cell {
  constructor(x, y, w, l, c) {
    this.x = x
    this.y = y
    this.w = w
    this.l = l
    this.c = c
  }

  draw() {
    ctx.moveTo(this.x, this.y)
    ctx.beginPath()
    ctx.fillStyle = this.c
    ctx.fillRect(this.x, this.y, this.w, this.l)
    ctx.stroke()
    ctx.closePath()
  }
}

function init() {
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      grid[i][j] = new Cell(i * cellWidth, j * cellHeight, cellWidth, cellHeight, "blue")
      grid[i][j].draw()
    }
  }
  for (let i = 0; i < rows; i++) {
    
  }
}

//GRADIENT
// var screen = new Array(can.width / squaresize);
// for (var columns = 0; columns < screen.length; columns++) {
//   screen[columns] = new Array(can.height / squaresize)
//   for (var i = 0; i < screen.length; i++) {
//     screen[columns][i] = ["rgb(",columns,",",i,",",i * 5,")"].join("")
//     drawRect(squaresize, squaresize, i * squaresize, columns * squaresize, screen[columns][i])
//   }
// }