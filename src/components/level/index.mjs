import EntityManager from '../entity-manager/index.mjs'

function Level (w, h, entities) {
  this.w = w
  this.h = h
  this.entityManager = new EntityManager()
  this.entityManager.addEntities(entities)
  this.update = (dt) => {
    this.entityManager.updateEnities(dt)
  }
  this.render = (canvas, ctx, camera) => {
    this.entityManager.renderEntities(canvas, ctx, camera)
  }
  this.debugRender = (canvas, ctx, camera) => {
    this.entityManager.debugRenderEntities(canvas, ctx, camera)
  }
}

export default Level
