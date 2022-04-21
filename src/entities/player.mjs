// Controllers should be dependency injected in the future.
import { getActionState, addActionDownListener } from '../controller.mjs'
import { COLORS } from '../components/ascii-canvas/index.mjs'
import { ENTITY_TYPES } from '../components/entity-factory/index.mjs'
import { rectanglesOverlap } from '../components/collisions/index.mjs'
import { getCurrentScene, setSceneByName } from '../components/scene-manager/index.mjs'

const X_SPEED = 35
const GRAVITY = 110
const FLOOR_Y = 20

function Player (x, y) {
  this.type = ENTITY_TYPES.PLAYER
  this.x = x
  this.y = y

  this.w = 8
  this.h = 5

  this.speed = {
    x: 0,
    y: 0,
  }

  this.collider = {
    x,
    y,
    w: this.w,
    h: this.h,
  }

  this.grounded = false

  this.initialJumpSpeed = -45

  this.update = (dt) => {
    if (getActionState('left')) {
      this.x -= X_SPEED * dt
    }
    if (getActionState('right')) {
      this.x += X_SPEED * dt
    }

    this.speed.y += GRAVITY * dt
    this.y += this.speed.y * dt

    if (this.y > FLOOR_Y) {
      this.grounded = true
      this.y = FLOOR_Y
      this.speed.y = 0
    }

    this.collider.x = this.x
    this.collider.y = this.y
  }

  this.render = (canvas, ctx, camera) => {
    ctx.setFill('x', COLORS.WHITE, COLORS.NAVY)
    ctx.fillRect(
      Math.floor(this.x - camera.x),
      Math.floor(this.y - camera.y), this.w, this.h,
    )
  }

  this.debugRender = (canvas, ctx, camera) => {

  }

  this.jump = () => {
    if (this.grounded) {
      this.speed.y = this.initialJumpSpeed
      this.grounded = false
    }
  }

  addActionDownListener('jump', () => {
    this.jump()
  })

  addActionDownListener('up', () => {
    const door = getCurrentScene().entityManager.getEntityOfType(ENTITY_TYPES.DOOR)
    if (!door) return
    if (rectanglesOverlap(this.collider, door.collider)) {
      if (door.open) {
        setSceneByName(door.leadsTo)
      } else {
        // play sound trying to open door
      }
    }
  })
}

export default Player
