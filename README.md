# ASCII Canvas

An ASCII renderer for the dom

## Running the project
Run the following commands from the root.
`yarn build`
`yarn start`

## Documentation

### index.mjs
Simple express server, serves static files from the public folder.

### /src
All code in this folder will be compiled into the public folder.

### /public
Compiled source files (including html, css, etc)

### /src/audio.mjs
Audio loader, allows you to add sound fx or music.

### /src/config.mjs
Assorted configuration, directions, colors, characters.

### /src/controller.mjs
Allows you to register actions for controlling the game. You can then poll or use event listeners.

### /src/index.mjs
A bit of a hack, maps slugs onto js files

### /src/textures.mjs
Texture loader, allows you to load in ascii textures.

### /src/_legacy/pages
Old code, can be used as a reference, no longer used.

### /src/ascii
Folder containing json files for ANSI / ASCII art. Format:
```
{
  "frames": [
    {
      "data": [
        {
          "character": "x",
          "color": "3",
          "backgroundColor": "4",
          
        }
      ]
    }
  ],
  "w": 16,
  "h": 8
}
```

### /src/components
Folder containing different components for the ANSI engine. Looking back each file doesn't need its own folder. You could just swap them out to ascii-canvas.mjs, etc. They only need their own folder if there are multiple files being grouped together.

#### /src/components/ascii-canvas/index.mjs
Dom rendering engine for ansi / ascii art. Functions modelled off html5 canvas.
Currently has 3 rendering methods, just use drawImage3, the others are around for legacy reasons.

**Note** the renderer is currently inefficient as it is re-rendering every character every frame. I highly recommend creating a diffing function to detect which elements have changed and only re-render those.

#### /src/components/camera/index.mjs
Simple camera implementation that takes an x, y, w and h. Also provides a centerOnPosition helper function.

#### /src/components/collisions/index.mjs
Provides a function to detect if two rectangles are overlapping.

#### /src/components/entity-factory/index.mjs
Maps entity type strings onto game objects. Allows us to read map json files and convert them into js objects.

#### /src/components/entity-manager/index.mjs
Handles entities for a scene, allows you to add, update, render, debug render and get entities of type. Handles the deletion of entities using the `.dead` prop.

#### /src/components/level/index.mjs
Simple wrapper around entity manager, also provides a width and height. In the future additional pieces of information would be added to this associated with the level.

#### /src/components/scene-manager/index.mjs
Handles the loading and unloding of scenes. Provides event emitters for when the scene changes.

### /src/entities
Contains files for all the entities in the game. Fairly straight forward design - prototypes per entity type, mutable data, methods associated with the entity e.g. update, render, handling event listeners, etc.

### /src/pages
Folder containing all of the narrative experience pages.

#### /src/pages/index.mjs
Narrative experience entry point, implements the following features:
- Controller management
- Scene loading / unloading
- Rendering the scene
- Camera handling
- Game loop

#### /src/pages/paint.mjs
ANSI painting tool, allows you to draw & animate ANSI / ASCII art and save them to .json files.

### /src/scenes
Contains .json files for map data. Format:
```
{
  "w": 160,
  "h": 40,
  "entities": [
    "type": "tile",
    "data": {
      "x": 0,
      "y": 25
    }
  ]
}
```
