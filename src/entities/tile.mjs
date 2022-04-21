import { COLORS } from '../components/ascii-canvas/index.mjs'
import { ENTITY_TYPES } from '../components/entity-factory/index.mjs'

const image = {
  data: [
    `██████████`,
    `██████████`,
    `▓▓▓▓▓▓▓▓▓▓`,
    `▒▒▒▒▒▒▒▒▒▒`,
    `░░░░░░░░░░`,
  ].map(row => row.split('')),
  w: 10,
  h: 5,
  color: COLORS.PINK,
}

function Tile (x, y) {
  this.type = ENTITY_TYPES.TILE
  this.x = x
  this.y = y
  this.image = image

  this.update = (dt) => {}

  this.render = (canvas, ctx, camera) => {
    ctx.drawImage(this.image, Math.floor(this.x - camera.x), Math.floor(this.y - camera.y))
  }

  this.debugRender = (canvas, ctx, camera) => {}
}

export default Tile
