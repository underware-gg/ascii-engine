import { COLORS } from '../components/ascii-canvas/index.mjs'
import { ENTITY_TYPES } from '../components/entity-factory/index.mjs'

const image = {
  data: [],
  w: 0,
  h: 0,
  color: COLORS.PINK,
}

function TextArea (x, y) {
  this.x = x
  this.y = y
  this.image = image
  this.text = 'This is a test'

  this.w = 0
  this.h = 0

  this.update = (dt) => {}

  this.render = (canvas, ctx, camera) => {
    ctx.drawImage(this.image, Math.floor(this.x - camera.x), Math.floor(this.y - camera.y))
  }

  this.debugRender = (canvas, ctx, camera) => {}
}

export default TextArea
