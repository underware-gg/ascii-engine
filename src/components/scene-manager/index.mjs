import EventEmitter from 'events'
import Level from '../level/index.mjs'
import { createEntities } from '../entity-factory/index.mjs'

const sceneEmitter = new EventEmitter()
// Potentially dangerous for memory leak reasons.
sceneEmitter.setMaxListeners(0)

const scenes = {}
let currentScene = null

export const loadScene = scene => {
  scenes[scene.name] = scene.data
}

export const loadScenes = scenes => {
  scenes.forEach(scene => {
    loadScene(scene)
  })
}

export const setSceneByName = name => {
  const sceneData = scenes[name]
  currentScene = new Level(
    sceneData.w,
    sceneData.h,
    createEntities(sceneData.entities)
  )
  sceneEmitter.emit(
    'change',
    currentScene,
  )
}

export const addSceneChangeListener = (callback) => {
  sceneEmitter.addListener('change', callback)
}

export const removeSceneChangeListener = (callback) => {
  sceneEmitter.removeListener('change', callback)
}

export const getCurrentScene = () => currentScene
