export const COLORS = {
  TRANSPARENT: -1,
  PINK: 0,
  WHITE: 1,
  LIGHT_BLUE: 2,
  DARK_BLUE: 3,
  NAVY: 4,
}

// I think this needs to be expanded to support colour / icon palettes
const COLOR_CLASSES = [
  'pink',
  'white',
  'light-blue',
  'dark-blue',
  'navy',
]

const BACKGROUND_COLOR_CLASSES = [
  'pink-background',
  'white-background',
  'light-blue-background',
  'dark-blue-background',
  'navy-background',
]

// Add logic so you can't draw outside the canvas.
function AsciiContext (canvas) {
  this.canvas = canvas
  this.fill = { character: 'x', color: COLORS.WHITE, backgroundColor: COLORS.NAVY }
  this.stroke = { character: '-', color: COLORS.PINK, backgroundColor: COLORS.NAVY }
  this.setFill = (character, color, backgroundColor) => {
    this.fill = { character, color, backgroundColor }
  }
  this.setStroke = (character, color, backgroundColor) => {
    this.stroke = { character, color, backgroundColor }
  }
  this.clearRect = (x, y, w, h) => {
    const minWidth = Math.max(x, 0)
    const minHeight = Math.max(y, 0)
    const maxWidth = Math.min(x + w, this.canvas.width)
    const maxHeight = Math.min(y + h, this.canvas.height)

    for (let i = minWidth; i < maxWidth; i++) {
      for (let j = minHeight; j < maxHeight; j++) {
        this.canvas.data[j][i] = { character: ' ', color: COLORS.PINK, backgroundColor: COLORS.NAVY }
      }
    }
    this.canvas.changed = true
  }

  this.strokeRect = (x, y, w, h) => {
    if (x > -1) {
      for (let j = Math.max(y, 0); j < Math.min(y + h, this.canvas.height); j++) {
        this.canvas.data[j][x] = this.stroke
      }
    }

    if (x + w <= this.canvas.width) {
      for (let j = Math.max(y, 0); j < Math.min(y + h, this.canvas.height); j++) {
        this.canvas.data[j][x + w - 1] = this.stroke
      }
    }

    if (y > -1) {
      for (let i = Math.max(x, 0); i < Math.min(x + w, this.canvas.width); i++) {
        this.canvas.data[y][i] = this.stroke
      }
    }

    if (y + h <= this.canvas.height) {
      for (let i = Math.max(x, 0); i < Math.min(x + w, this.canvas.width); i++) {
        this.canvas.data[y + h - 1][i] = this.stroke
      }
    }
    this.canvas.changed = true
  }

  this.fillRect = (x, y, w, h) => {
    for (let i = Math.max(x, 0); i < Math.min(x + w, this.canvas.width); i++) {
      for (let j = Math.max(y, 0); j < Math.min(y + h, this.canvas.height); j++) {
        this.canvas.data[j][i] = this.fill
      }
    }
    this.canvas.changed = true
  }

  this.setPixel = (x, y, character) => {
    this.canvas.data[y][x] = character
    this.canvas.changed = true
  }

  // Basic image format
  this.drawImage = (asciiImage, x, y) => {
    asciiImage.data.forEach((row, i) => {
      row.forEach((character, j) => {
        if (y + i > -1 && y + i < this.canvas.height && x + j > -1 && x + j < this.canvas.width && character !== ' ') {
          this.canvas.data[y + i][x + j] = {
            character,
            color: asciiImage.color,
            backgroundColor: COLORS.NAVY,
          }
        }
      })
    })
    this.canvas.changed = true
  }

  // Image format that supports character, foreground color & background color
  this.drawImage2 = (asciiImage, x, y) => {
    asciiImage.data.forEach((row, i) => {
      row.forEach((character, j) => {
        if (y + i > -1 && y + i < this.canvas.height && x + j > -1 && x + j < this.canvas.width && character.character !== ' ') {
          this.canvas.data[y + i][x + j] = {
            character: character.character,
            color: character.color,
            backgroundColor: character.backgroundColor
          }
        }
      })
    })
    this.canvas.changed = true
  }

  // Image format that supports animations
  // Perhaps this should instead JUST take in the frame.
  // That way the animation could be a layer higher.
  this.drawImage3 = (asciiImage, x, y, frameIndex) => {
    const imageData = asciiImage.frames[frameIndex].data
    imageData.forEach((row, i) => {
      row.forEach((character, j) => {
        if (y + i > -1 && y + i < this.canvas.height && x + j > -1 && x + j < this.canvas.width && character.character !== ' ') {
          this.canvas.data[y + i][x + j] = {
            character: character.character,
            color: character.color,
            backgroundColor: character.backgroundColor
          }
        }
      })
    })
    this.canvas.changed = true
  }
}

const create2DArray = (width, height, value) => {
  const arr = []
  for (let y = 0; y < height; y++) {
    arr[y] = []
    for (let x = 0; x < width; x++) {
      arr[y][x] = value
    }
  }
  return arr
}

const fromAsciiToString = (ascii) => {
  return ascii.map(
    (row, y) => row.map((item, x) => {
      return `<span data-x="${x}" data-y="${y}" class="${COLOR_CLASSES[item.color]}${item.backgroundColor === COLORS.TRANSPARENT ? '' : ` ${BACKGROUND_COLOR_CLASSES[item.backgroundColor]}`}">${item.character}</span>`
    }).join('')
  ).join('\n')
}

// Other places should be updated to use width rather than w or visa versa.
function AsciiCanvas (container, width, height) {
  this.changed = false
  this.width = width
  this.height = height
  this.data = create2DArray(this.width, this.height, { character: ' ', color: COLORS.PINK, backgroundColor: COLORS.NAVY })
  this.setSize = (w, h) => {
    this.width = w
    this.height = h
    this.data = create2DArray(this.width, this.height, { character: ' ', color: COLORS.PINK, backgroundColor: COLORS.NAVY })
    this.updateDom()
  }
  this.context = new AsciiContext(this)
  this.getContext = () => this.context
  this.container = container
  this.preNode = document.createElement('pre')
  this.updateDom = () => {
    if (this.changed) {
      this.preNode.innerHTML = fromAsciiToString(this.data)
      this.changed = false
    }
  }
  this.updateDom()
  this.container.appendChild(this.preNode)
}

export default AsciiCanvas
