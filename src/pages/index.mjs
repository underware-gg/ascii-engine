import {
  registerActions,
  handleKeyDown,
  handleKeyUp,
} from '../controller.mjs'
import AsciiCanvas from '../components/ascii-canvas/index.mjs'
import Camera from '../components/camera/index.mjs'
import startScene from '../scenes/start.json'
import callToActionScene from '../scenes/call-to-action.json'
import { ENTITY_TYPES } from '../components/entity-factory/index.mjs'
import {
  loadScenes,
  setSceneByName,
  addSceneChangeListener,
} from '../components/scene-manager/index.mjs'
import textAreaBg from '../ascii/text-area-bg.json'

const scenes = [
  {
    name: 'start',
    data: startScene,
  },
  {
    name: 'call-to-action',
    data: callToActionScene,
  },
]

const $ = (id) => document.getElementById(id)

const CANVAS_WIDTH = 80
const CANVAS_HEIGHT = 40

const canvasContainer = $('game')

const asciiCanvas = new AsciiCanvas(canvasContainer, CANVAS_WIDTH, CANVAS_HEIGHT)
const context = asciiCanvas.getContext()

let lastTime = (new Date()).getTime()
let currentTime = 0
let dt = 0

const camera = new Camera(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
let scene = null
let player = null

loadScenes(scenes)
addSceneChangeListener(newScene => {
  scene = newScene
  player = scene.entityManager.getEntityOfType(ENTITY_TYPES.PLAYER)
})
setSceneByName('start')

document.addEventListener('keydown', (e) => {
  handleKeyDown(e)
}, false)

document.addEventListener('keyup', e => {
  handleKeyUp(e)
}, false)

registerActions([
  {
    name: 'jump',
    keycode: '32',
  },
  {
    name: 'left',
    keycode: '65',
  },
  {
    name: 'right',
    keycode: '68',
  },
  {
    name: 'up',
    keycode: '87',
  },
])

document.addEventListener('keydown', (e) => {
  handleKeyDown(e)
}, false)

document.addEventListener('keyup', e => {
  handleKeyUp(e)
}, false)

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

  if (scene) {
    scene.update(dt)

    camera.centerOnPosition(player.x + player.w * 0.5, CANVAS_HEIGHT * 0.5)
    if (camera.x < 0) {
      camera.x = 0
    }
    if (camera.x > scene.w - camera.w) {
      camera.x = scene.w - camera.w
    }
    if (camera.y < 0) {
      camera.y = 0
    }
    if (camera.y > scene.h - camera.h) {
      camera.y = scene.h - camera.h
    }

    render()
  }

  lastTime = currentTime
}

const render = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  scene.render(asciiCanvas, context, camera)
  context.drawImage3(textAreaBg, 0, CANVAS_HEIGHT - 10, 0)
  asciiCanvas.updateDom()
}

init().then(() => {}).catch(() => {})
