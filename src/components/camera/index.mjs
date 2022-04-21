// How should I handle cameras updating the rendering?
function Camera (x, y, w, h) {
  this.x = x
  this.y = y
  this.w = w
  this.h = h

  this.centerOnPosition = (x, y) => {
    this.x = parseInt(x - this.w * 0.5)
    this.y = parseInt(y - this.h * 0.5)
  }
}

export default Camera
