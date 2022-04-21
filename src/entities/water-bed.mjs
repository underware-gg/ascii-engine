import { ENTITY_TYPES } from '../components/entity-factory/index.mjs'
import image from '../ascii/water-bed.json'

function WaterBed (x, y) {
  this.type = ENTITY_TYPES.WATER_BED
  this.x = x
  this.y = y
  this.image = image
  this.frame = 0

  this.update = (dt) => {}

  this.render = (canvas, ctx, camera) => {
    ctx.drawImage3(this.image, this.x - camera.x, this.y - camera.y, this.frame)
  }

  this.debugRender = (canvas, ctx, camera) => {}
}

export default WaterBed
