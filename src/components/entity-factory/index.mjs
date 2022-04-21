import Player from '../../entities/player.mjs'
import Tile from '../../entities/tile.mjs'
import Door from '../../entities/door.mjs'
import Water from '../../entities/water.mjs'
import WaterDrain from '../../entities/water-drain.mjs'
import WaterBed from '../../entities/water-bed.mjs'
import Chip from '../../entities/chip.mjs'

export const ENTITY_TYPES = {
  PLAYER: 'player',
  TILE: 'tile',
  DOOR: 'door',
  WATER: 'water',
  WATER_DRAIN: 'water-drain',
  WATER_BED: 'water-bed',
  CHIP: 'chip',
  // KEY: 'key',
}

export const createEntityOfType = (type, data) => {
  if (type === ENTITY_TYPES.PLAYER) {
    return new Player(data.x, data.y)
  } else if (type === ENTITY_TYPES.TILE) {
    return new Tile(data.x, data.y)
  } else if (type === ENTITY_TYPES.DOOR) {
    return new Door(data.x, data.y, data.open, data.leadsTo)
  } else if (type === ENTITY_TYPES.WATER) {
    return new Water(data.x, data.y)
  } else if (type === ENTITY_TYPES.WATER_DRAIN) {
    return new WaterDrain(data.x, data.y)
  } else if (type === ENTITY_TYPES.WATER_BED) {
    return new WaterBed(data.x, data.y)
  } else if (type === ENTITY_TYPES.CHIP) {
    return new Chip(data.x, data.y)
  }
  return null
}

export const createEntities = (entities) => {
  return entities.map(entity => createEntityOfType(entity.type, entity.data)).filter(entity => entity !== null)
}
