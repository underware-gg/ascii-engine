// Don't bother using this yet.
import fs from 'fs'

const textures = {}

export const loadTextures = async (texturesData) =>
  new Promise ((resolve, reject) => {
    texturesData.forEach(textureData => {
      const texture = JSON.parse(fs.readFileSync(textureData.src))
      textures[textureData.name] = texture
      resolve(texture)
    })
  })

export const getTextureByName = name => textures[name] || null
