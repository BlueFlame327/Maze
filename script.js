const interval = 100
const w = 600
const h = 600
const rows = 20
const cols = 20
const cellWidth = w / cols
const cellHeight = h / rows

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
canvas.width = w
canvas.height = h

function drawRect(x, y, w, h, color) {
  context.fillStyle = color
  context.fillRect(x, y, w, h)
}

class Cell { 
  wallWidth = 1
  visited = false
  found = false
  start = false
  walls = [true, true, true, true]
  
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    //cell.neighbors === [top, left, down, right]
    this.neighbors = []
  }
  
  draw() {
    this.drawCell()
    this.drawWalls()
  }
  
  drawCell() {
    let color = "black"
    if(this.start || this.end) {
      color = "red"
    } else if (this.visited) {
      color = "blue"
    } else if (this.found) {
      color = "purple"
    }
    drawRect(this.x, this.y, this.w, this.h, color)
  }
  
  drawWalls() {
    //cell.neighbors === [top, left, down, right]
    if(this.walls[0]) {
      //top
      drawRect(this.x, this.y, this.w, this.wallWidth, "white")
    }
    
    if(this.walls[1]) {
      //left      
      drawRect(this.x, this.y, this.wallWidth, this.h, "white")

    }
  }
  
  visitNeighbor() {
    const unvisited = this.neighbors.filter(neighbor => neighbor !== undefined && !neighbor.visited)
    if(unvisited.length === 0) {
      return
    }
    const randomNeighborInd = Math.floor(Math.random() * unvisited.length) 
    const randomNeighbor = unvisited[randomNeighborInd]
    randomNeighbor.visited = true
    
    //deal with walls
    const thisWallInd = this.neighbors.indexOf(randomNeighbor)
    this.walls[thisWallInd] = false
    //up for this means down for them, 0 -> 2
    //left -> right, 1 -> 3
    //down -> up, 2 -> 0
    // right -> left, 3 -> 1
    const randomWallInd = (thisWallInd + 2) % 4
    randomNeighbor.walls[randomWallInd] = false
    
    return randomNeighbor
  }
}

function createGrid() {
  const result = Array(rows).fill().map(() => Array(cols))
  for(let i = 0; i < rows; ++i) {
    for(let j = 0; j < cols; ++j) {
      //We have to flip i and j with x and y to fix everything!
      result[i][j] = new Cell(j * cellWidth, i * cellHeight, cellWidth, cellHeight)
      result[i][j].draw()
    }
  }
  return result
}

function getIfInBounds(grid, i, j) {
  if(i < 0 || j < 0 || i >= rows || j >= cols) {
    return undefined
  }
  return grid[i][j]
}

function populateCellsWithNeighbors(grid) {
  for(let i = 0; i < rows; ++i) {
    for(let j = 0; j < cols; ++j) {
      const up = getIfInBounds(grid, i - 1, j    )
      grid[i][j].neighbors.push(up)
      
      const left = getIfInBounds(grid, i    , j - 1)
      grid[i][j].neighbors.push(left)
      
      const down = getIfInBounds(grid, i + 1, j    )
      grid[i][j].neighbors.push(down)
      
      const right = getIfInBounds(grid, i    , j + 1)
      grid[i][j].neighbors.push(right)
      
      //cell.neighbors === [top, left, down, right]
      //for cell 0,0 (which is in the top left), it doesn"t have an up or left neighbor
      //so it looks like [undefined, undefined, Cell, Cell].
    }
  }
}

function makeMazeDepthFirst(cellStack) {
  if(cellStack.length == 0) {
    return
  }
  const top = cellStack[cellStack.length - 1]
  const neighbor = top.visitNeighbor()
  if(neighbor === undefined) {
    cellStack.pop()
  } else {
    cellStack.push(neighbor)
  }
}

function drawMaze(grid, cellStack) {
  drawRect(0, 0, w, h, "white")
  makeMazeDepthFirst(cellStack)
  for(let i = 0; i < rows; ++i) {
    for(let j = 0; j < cols; ++j) {
      grid[i][j].draw()
    }
  }
}

function getRandomCell(grid) {
  const x = Math.floor(Math.random() * cols)
  const y = Math.floor(Math.random() * rows)
  return grid[y][x]
}

const grid = createGrid()

populateCellsWithNeighbors(grid)

const start = getRandomCell(grid)
start.start = true
start.visited = true

const cellStack = [start]

setInterval(() => drawMaze(grid, cellStack), interval)