const can = document.getElementById("c")
const ctx = can.getContext("2d")

drawRect(20, 20, 0, 0, "blue")

function drawRect(width, length, x, y, color) {
  ctx.moveTo(x, y)
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, length)
  ctx.stroke()
  ctx.closePath()
}