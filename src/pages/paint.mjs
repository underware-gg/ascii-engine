import AsciiCanvas, { COLORS } from '../components/ascii-canvas/index.mjs'
import { characters } from '../config.mjs'

const $ = (id) => document.getElementById(id)

const brushInput = $('brush-input')
const colorInput = $('brush-color-input')
const backgroundColorInput = $('brush-background-color-input')
const pencilButton = $('pencil-button')
const eraserButton = $('eraser-button')
const canvasWidthInput = $('canvas-width-input')
const canvasHeightInput = $('canvas-height-input')

const TOOL = {
  PENCIL: 'pencil',
  'FILL': 'fill',
  ERASER: 'eraser',
}

let tool = TOOL.PENCIL
let brush = {
  character: 'x',
  color: COLORS.WHITE,
  backgroundColor: COLORS.NAVY,
}

let CANVAS_WIDTH = 80
let CANVAS_HEIGHT = 40

let filename = 'sprite'

const filenameInput = $('filename-input')

filenameInput.addEventListener('input', e => {
  if (e.target.value !== '') {
    filename = e.target.value
  }
})

const downloadButton = $('download-button')
downloadButton.addEventListener('click', () => {
  downloadButton.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(drawingImage2)))
  downloadButton.setAttribute('download', `${filename}.json`)
})

canvasWidthInput.addEventListener('input', e => {
  if (e.target.value !== '') {
    CANVAS_WIDTH = parseInt(e.target.value)
    asciiCanvas.setSize(CANVAS_WIDTH, CANVAS_HEIGHT)
    drawingImage2 = createBlankImage(CANVAS_WIDTH, CANVAS_HEIGHT)
  }
})

canvasHeightInput.addEventListener('input', e => {
  if (e.target.value !== '') {
    CANVAS_HEIGHT = parseInt(e.target.value)
    asciiCanvas.setSize(CANVAS_WIDTH, CANVAS_HEIGHT)
    drawingImage2 = createBlankImage(CANVAS_WIDTH, CANVAS_HEIGHT)
  }
})

brushInput.addEventListener('input', e => {
  if (e.target.value !== '') {
    brush.character = e.target.value
  }
})

const ansiPaletteContainer = $('ansi-palette-container')

characters.forEach(character => {
  const button = document.createElement('button')
  button.innerText = character
  button.addEventListener('click', () => {
    brushInput.value = character
    brush.character = character
  })
  ansiPaletteContainer.appendChild(button)
})

colorInput.addEventListener('input', e => {
  brush.color = e.target.value
})

backgroundColorInput.addEventListener('input', e => {
  brush.backgroundColor = e.target.value
})

pencilButton.addEventListener('click', () => {
  tool = TOOL.PENCIL
})

const fillButton = $('fill-button')

fillButton.addEventListener('click', () => {
  tool = TOOL.FILL
})

eraserButton.addEventListener('click', () => {
  tool = TOOL.ERASER
})

const canvasContainer = $('game')

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

// const drawingImage = {
//   data: create2DArray(CANVAS_WIDTH, CANVAS_HEIGHT, { character: ' ', color: COLORS.WHITE, backgroundColor: COLORS.TRANSPARENT }),
//   w: CANVAS_WIDTH,
//   h: CANVAS_HEIGHT,
//   color: COLORS.WHITE,
// }

const createBlankFrame = (w, h) => {
  return {
    data: create2DArray(
      w,
      h,
      {
        character: ' ',
        color: COLORS.WHITE,
        backgroundColor: COLORS.TRANSPARENT,
      },
    ),
  }
}

const createBlankImage = (w, h) => {
  return {
    frames: [
      createBlankFrame(w, h),
    ],
    w,
    h,
  }
}

const addFrameToImage = (image, w, h) => {
  image.frames.push(createBlankFrame(w, h))
}

let drawingImage2 = createBlankImage(CANVAS_WIDTH, CANVAS_HEIGHT)

let frame = 0
const frameInput = $('frame-input')
const addFrameButton = $('add-frame-button')

frameInput.addEventListener('change', e => {
  if (e.target.value !== '') {
    frame = parseInt(e.target.value)
  }
})

addFrameButton.addEventListener('click', () => {
  addFrameToImage(drawingImage2, CANVAS_WIDTH, CANVAS_HEIGHT)
  frameInput.max++
})

const usePencil = (imageData, x, y) => {
  imageData[y][x] = {
    character: brush.character,
    color: brush.color,
    backgroundColor: brush.backgroundColor,
  }
}

const floodFill = (imageData, x, y, newColor) => {
  //Get the input which needs to be replaced.
  const current = imageData[y][x]

  //If the newColor is same as the existing
  //Then return the original image.
  if (current === newColor) {
    return imageData
  }

  //Other wise call the fill function which will fill in the existing image.
  fill(imageData, x, y, newColor, current)

  //Return the image once it is filled
  return imageData
}

const fill = (imageData, x, y, newColor, current) => {
  if(y < 0){
    return
  }

  if(x < 0){
    return
  }

  if(y > imageData.length - 1){
    return
  }

  if(x > imageData[y].length - 1){
    return
  }

  // I could do a more precise comparison here in the future.
  if(JSON.stringify(imageData[y][x]) !== JSON.stringify(current)){
    return
  }

  imageData[y][x] = {
    character: brush.character,
    color: brush.color,
    backgroundColor: brush.backgroundColor,
  }

  fill(imageData, x - 1, y, newColor, current)
  fill(imageData, x + 1, y, newColor, current)
  fill(imageData, x, y - 1, newColor, current)
  fill(imageData, x, y + 1, newColor, current)
}


const useFill = (imageData, x, y) => {
  floodFill(imageData, x, y, brush)
}

const useEraser = (imageData, x, y) => {
  imageData[y][x] = {
    character: ' ',
    color: brush.color,
    backgroundColor: COLORS.TRANSPARENT,
  }
}

const useBrush = (x, y) => {
  const imageData = drawingImage2.frames[frame].data
  switch (tool) {
    case TOOL.PENCIL:
      usePencil(imageData, x, y)
      break
    case TOOL.FILL:
      useFill(imageData, x, y)
      break
    case TOOL.ERASER:
      useEraser(imageData, x, y)
      break
  }
}

let drawing = false
canvasContainer.addEventListener('mousedown', e => {
  drawing = true
  const x = e.target.dataset.x
  const y = e.target.dataset.y

  if (x && y) {
    useBrush(parseInt(x), parseInt(y))
  }
})

canvasContainer.addEventListener('mousemove', e => {
  if (drawing) {
    const x = e.target.dataset.x
    const y = e.target.dataset.y

    if (x && y) {
      useBrush(parseInt(x), parseInt(y))
    }
  }
})

canvasContainer.addEventListener('mouseup', e => {
  drawing = false
})

const asciiCanvas = new AsciiCanvas(canvasContainer, CANVAS_WIDTH, CANVAS_HEIGHT)
const context = asciiCanvas.getContext()

let lastTime = (new Date()).getTime()
let currentTime = 0
let dt = 0

const init = async () => {
  lastTime = (new Date()).getTime()
  currentTime = 0
  dt = 0

  window.requestAnimationFrame(update)
}

const update = () => {
  window.requestAnimationFrame(update)

  currentTime = (new Date()).getTime()
  dt = (currentTime - lastTime) / 1000

  render()

  lastTime = currentTime
}

const render = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  context.drawImage3(drawingImage2, 0, 0, frame)
  asciiCanvas.updateDom()
}

init().then(() => {

}).catch(() => {

})
