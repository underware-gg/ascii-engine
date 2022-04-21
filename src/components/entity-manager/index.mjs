function EntityManager () {
  this.entities = []
  this.addEntity = function (entity) {
    this.entities.push(entity)
  }
  this.addEntities = function (entities) {
    entities.forEach(entity => {
      this.addEntity(entity)
    })
  }
  this.updateEnities = (dt) => {
    this.entities.forEach(entity => {
      entity.update(dt)
    })
    if (this.entities.some(entity => entity.dead)) {
      this.entities = this.entities.filter(entity => !entity.dead)
    }
  }
  this.renderEntities = (canvas, ctx, camera) => {
    this.entities.forEach(entity => {
      entity.render(canvas, ctx, camera)
    })
  }
  this.debugRenderEntities = (canvas, ctx, camera) => {
    this.entities.forEach(entity => {
      entity.debugRender(canvas, ctx, camera)
    })
  }
  this.getEntityOfType = entityType => {
    return this.entities.find(entity => entity.type === entityType)
  }
}

export default EntityManager
