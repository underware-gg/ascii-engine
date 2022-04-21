import { ENTITY_TYPES } from '../components/entity-factory/index.mjs'
import image from '../ascii/water.json'

const FRAME_LENGTH = 0.125

function Water (x, y) {
  this.type = ENTITY_TYPES.WATER
  this.x = x
  this.y = y
  this.image = image
  this.frame = 0
  this.accumulator = 0

  this.update = (dt) => {
    this.accumulator += dt

    while (this.accumulator > FRAME_LENGTH) {
      this.accumulator -= FRAME_LENGTH
      this.frame++
      if (this.frame > this.image.frames.length - 1) {
        this.frame = 0
      }
    }
  }

  this.render = (canvas, ctx, camera) => {
    ctx.drawImage3(this.image, this.x - camera.x, this.y - camera.y, this.frame)
  }

  this.debugRender = (canvas, ctx, camera) => {}
}

export default Water
