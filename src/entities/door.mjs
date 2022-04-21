import { COLORS } from '../components/ascii-canvas/index.mjs'
import { ENTITY_TYPES } from '../components/entity-factory/index.mjs'

const image = {
  data: [
    [' ', '_', ',', '-', '-', ',', '_', ' '],
    ['/', ' ', '|', ' ', ' ', '|', ' ', `\\`],
    ['|', ' ', '|', ' ', ' ', '|', ' ', '|'],
    ['|', ' ', '|', ' ', ' ', '<', '&', '>'],
    ['|', ' ', '|', ' ', ' ', '|', ' ', '|'],
    ['|', ' ', '|', ' ', ' ', '|', ' ', '|'],
  ],
  w: 8,
  h: 6,
  color: COLORS.LIGHT_BLUE,
}

// This is legacy, it should use the frames system I built.
const imageOpen = {
  data: [
    [' ', '_', ',', '-', '-', ',', '_', ' '],
    ['/', ' ', ' ', ' ', ' ', ' ', ' ', `\\`],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
  ],
  w: 8,
  h: 6,
  color: COLORS.LIGHT_BLUE,
}

function Door (x, y, open, leadsTo) {
  this.type = ENTITY_TYPES.DOOR
  this.x = x
  this.y = y
  this.image = image
  this.open = open
  this.leadsTo = leadsTo

  this.w = 8
  this.h = 6

  this.collider = {
    x,
    y,
    w: this.w,
    h: this.h,
  }

  this.setOpen = open => this.open = open

  this.update = (dt) => {
    this.image = this.open ? imageOpen : image
  }

  this.render = (canvas, ctx, camera) => {
    ctx.drawImage(this.image, Math.floor(this.x - camera.x), Math.floor(this.y - camera.y))
  }

  this.debugRender = (canvas, ctx, camera) => {}
}

export default Door
