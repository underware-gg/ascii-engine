// import {
//   // getActionState,
//   registerActions,
//   addActionDownListener,
//   handleKeyDown,
//   handleKeyUp,
// } from '../controller.mjs'
// import AsciiCanvas, { COLORS } from '../components/ascii-canvas/index.mjs'
// import Camera from '../components/camera/index.mjs'
// // import { rectanglesOverlap } from '../collisions.mjs'
// import Level from '../components/level/index.mjs'
// // import waterImage from '../ascii/water.json'
// // import waterDrainImage from '../ascii/water-drain.json'
// // import waterBedImage from '../ascii/water-bed.json'
// import startScene from '../scenes/start.json'
// import {
//   // ENTITY_TYPES,
//   // createEntityOfType,
//   createEntities,
// } from '../components/entity-factory/index.mjs'
//
// // const keyImage = {
// //   data: [
// //     [' ', ',', 'o', '.', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '8', ' ', '8', ' '],
// //     ['d', ' ', ' ', ' ', 'b', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'a', '8', 'o', '8', 'b'],
// //     [' ', '`', 'o', `'`, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// //   ],
// //   w: 18,
// //   h: 3,
// //   color: COLORS.LIGHT_BLUE,
// // }
// //
// // const doorImage = {
// //   data: [
// //     [' ', '_', ',', '-', '-', ',', '_', ' '],
// //     ['/', ' ', '|', ' ', ' ', '|', ' ', `\\`],
// //     ['|', ' ', '|', ' ', ' ', '|', ' ', '|'],
// //     ['|', ' ', '|', ' ', ' ', '<', '&', '>'],
// //     ['|', ' ', '|', ' ', ' ', '|', ' ', '|'],
// //     ['|', ' ', '|', ' ', ' ', '|', ' ', '|'],
// //   ],
// //   w: 8,
// //   h: 6,
// //   color: COLORS.LIGHT_BLUE,
// // }
// //
// // const doorImageOpen = {
// //   data: [
// //     [' ', '_', ',', '-', '-', ',', '_', ' '],
// //     ['/', ' ', ' ', ' ', ' ', ' ', ' ', `\\`],
// //     ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
// //     ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
// //     ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
// //     ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
// //   ],
// //   w: 8,
// //   h: 6,
// //   color: COLORS.LIGHT_BLUE,
// // }
// //
// // const titleImage = {
// //   data: [
// //     `███    █▄      ███      ▄██████▄     ▄███████▄  ▄█     ▄████████  `,
// //     `███    ███ ▀█████████▄ ███    ███   ███    ███ ███    ███    ███  `,
// //     `███    ███    ▀███▀▀██ ███    ███   ███    ███ ███▌   ███    ███  `,
// //     `███    ███     ███   ▀ ███    ███   ███    ███ ███▌   ███    ███  `,
// //     `███    ███     ███     ███    ███ ▀█████████▀  ███▌ ▀███████████  `,
// //     `███    ███     ███     ███    ███   ███        ███    ███    ███  `,
// //     `███    ███     ███     ███    ███   ███        ███    ███    ███  `,
// //     `████████▀     ▄████▀    ▀██████▀   ▄████▀      █▀     ███    █▀   `,
// //     `                                                                  `,
// //     `                                                                  `,
// //   ].map(row => row.split('')),
// //   w: 66,
// //   h: 10,
// //   color: COLORS.WHITE,
// // }
// //
// // const ground = {
// //   data: [
// //     `██████████`,
// //     `██████████`,
// //     `▓▓▓▓▓▓▓▓▓▓`,
// //     `▒▒▒▒▒▒▒▒▒▒`,
// //     `░░░░░░░░░░`,
// //   ].map(row => row.split('')),
// //   w: 10,
// //   h: 5,
// //   color: COLORS.PINK,
// // }
// //
// // const titleImageOverlay = {
// //   data: [
// //     `▓█████▄▓██   ██▓  ██████ ▄▄▄█████▓ ▒█████   ██▓███   ██▓ ▄▄▄      `,
// //     `▒██▀ ██▌▒██  ██▒▒██    ▒ ▓  ██▒ ▓▒▒██▒  ██▒▓██░  ██▒▓██▒▒████▄    `,
// //     `░██   █▌ ▒██ ██░░ ▓██▄   ▒ ▓██░ ▒░▒██░  ██▒▓██░ ██▓▒▒██▒▒██  ▀█▄  `,
// //     `░▓█▄   ▌ ░ ▐██▓░  ▒   ██▒░ ▓██▓ ░ ▒██   ██░▒██▄█▓▒ ▒░██░░██▄▄▄▄██ `,
// //     `░▒████▓  ░ ██▒▓░▒██████▒▒  ▒██▒ ░ ░ ████▓▒░▒██▒ ░  ░░██░ ▓█   ▓██▒`,
// //     ` ▒▒▓  ▒   ██▒▒▒ ▒ ▒▓▒ ▒ ░  ▒ ░░   ░ ▒░▒░▒░ ▒▓▒░ ░  ░░▓   ▒▒   ▓▒█░`,
// //     ` ░ ▒  ▒ ▓██ ░▒░ ░ ░▒  ░ ░    ░      ░ ▒ ▒░ ░▒ ░      ▒ ░  ▒   ▒▒ ░`,
// //     ` ░ ░  ░ ▒ ▒ ░░  ░  ░  ░    ░      ░ ░ ░ ▒  ░░        ▒ ░  ░   ▒   `,
// //     `   ░    ░ ░           ░               ░ ░            ░        ░  ░`,
// //     ` ░      ░ ░                                                       `,
// //   ].map(row => row.split('')),
// //   w: 66,
// //   h: 10,
// //   color: COLORS.PINK,
// // }
// //
// // const finalImage = {
// //   data: [
// //     `                                                                  `,
// //     `                                                                  `,
// //     `                                                                  `,
// //     `                                                                  `,
// //     `                                                                  `,
// //     `                                                                  `,
// //     `                                                                  `,
// //     `                                                                  `,
// //     `                                                                  `,
// //     `                                                                  `,
// //   ].map(row => row.split('')),
// //   w: 66,
// //   h: 10,
// //   color: COLORS.PINK,
// // }
// //
// // const remainingPixels = titleImage.data.map((row, y) => {
// //   return row.map((element, x) => ({
// //     x,
// //     y,
// //   }))
// // }).flat()
//
// // const swapRandomPixel = () => {
// //   const randomPixelIndex = randomRange(0, remainingPixels.length - 1)
// //   const randomPixel = remainingPixels[randomPixelIndex]
// //   remainingPixels.splice(randomPixelIndex, 1)
// //   titleImage.data[randomPixel.y][randomPixel.x] = ' '
// //   finalImage.data[randomPixel.y][randomPixel.x] = titleImageOverlay.data[randomPixel.y][randomPixel.x]
// // }
//
// // const randomRange = (min, max) =>
// //   Math.floor(Math.random() * (max - min + 1) + min)
//
// document.addEventListener('keydown', (e) => {
//   handleKeyDown(e)
// }, false)
//
// document.addEventListener('keyup', e => {
//   handleKeyUp(e)
// }, false)
//
// registerActions([
//   {
//     name: 'jump',
//     keycode: '32',
//   },
//   {
//     name: 'left',
//     keycode: '65',
//   },
//   {
//     name: 'right',
//     keycode: '68',
//   },
//   {
//     name: 'restart',
//     keycode: '82',
//   },
// ])
//
// // addActionDownListener('jump', () => {
// //   jump()
// // })
//
// addActionDownListener(('restart'), () => {
//   console.log('_RESPAWN_')
// })
//
// document.addEventListener('keydown', (e) => {
//   handleKeyDown(e)
// }, false)
//
// document.addEventListener('keyup', e => {
//   handleKeyUp(e)
// }, false)
//
// const $ = (id) => document.getElementById(id)
//
// // const brushInput = $('brush-input')
// // const colorInput = $('brush-color-input')
// // const backgroundColorInput = $('brush-background-color-input')
// // const pencilButton = $('pencil-button')
// // const eraserButton = $('eraser-button')
//
// // const TOOL = {
// //   PENCIL: 'pencil',
// //   ERASER: 'eraser',
// // }
// //
// // let tool = TOOL.PENCIL
// // let brush = {
// //   character: 'x',
// //   color: COLORS.WHITE,
// //   backgroundColor: COLORS.NAVY,
// // }
// //
// // brushInput.addEventListener('input', e => {
// //   if (e.target.value !== '') {
// //     console.log('_BRUSH_CHARACTER_', e.target.value)
// //     brush.character = e.target.value
// //   }
// // })
// //
// // colorInput.addEventListener('input', e => {
// //   brush.color = e.target.value
// // })
// //
// // backgroundColorInput.addEventListener('input', e => {
// //   brush.backgroundColor = e.target.value
// // })
// //
// // pencilButton.addEventListener('click', () => {
// //   tool = TOOL.PENCIL
// // })
// //
// // eraserButton.addEventListener('click', () => {
// //   tool = TOOL.ERASER
// // })
//
// const CANVAS_WIDTH = 80
// const CANVAS_HEIGHT = 40
//
// const canvasContainer = $('game')
// // canvasContainer.addEventListener('mouseover', e => {
// //   console.log('_E_', e.target.dataset.x, e.target.dataset.y)
// // })
//
// // const create2DArray = (width, height, value) => {
// //   const arr = []
// //   for (let y = 0; y < height; y++) {
// //     arr[y] = []
// //     for (let x = 0; x < width; x++) {
// //       arr[y][x] = value
// //     }
// //   }
// //   return arr
// // }
// //
// // const drawingImage = {
// //   data: create2DArray(CANVAS_WIDTH, CANVAS_HEIGHT, { character: ' ', color: COLORS.WHITE, backgroundColor: COLORS.TRANSPARENT }),
// //   w: CANVAS_WIDTH,
// //   h: CANVAS_HEIGHT,
// //   color: COLORS.WHITE,
// // }
// //
// // let drawing = false
// // canvasContainer.addEventListener('mousedown', e => {
// //   drawing = true
// //   const x = e.target.dataset.x
// //   const y = e.target.dataset.y
// //
// //   if (x && y) {
// //     drawingImage.data[parseInt(y)][parseInt(x)] = tool === TOOL.PENCIL ? { character: brush.character, color: brush.color, backgroundColor: brush.backgroundColor } : { character: ' ', color: brush.color, backgroundColor: COLORS.TRANSPARENT }
// //   }
// // })
//
// // canvasContainer.addEventListener('mousemove', e => {
// //   if (drawing) {
// //     const x = e.target.dataset.x
// //     const y = e.target.dataset.y
// //
// //     if (x && y) {
// //       drawingImage.data[parseInt(y)][parseInt(x)] = tool === TOOL.PENCIL ? { character: brush.character, color: brush.color, backgroundColor: brush.backgroundColor } : { character: ' ', color: brush.color, backgroundColor: COLORS.TRANSPARENT }
// //     }
// //   }
// // })
//
// // canvasContainer.addEventListener('mouseout', e => {
// //   console.log('_MOUSE_OUT_')
// //   drawing = false
// // })
//
// // canvasContainer.addEventListener('mouseup', e => {
// //   drawing = false
// // })
//
// const asciiCanvas = new AsciiCanvas(canvasContainer, CANVAS_WIDTH, CANVAS_HEIGHT)
// const context = asciiCanvas.getContext()
//
// let lastTime = (new Date()).getTime()
// let currentTime = 0
// let dt = 0
// // const X_SPEED = 35
// // const GRAVITY = 110
//
// const init = async () => {
//   lastTime = (new Date()).getTime()
//   currentTime = 0
//   dt = 0
//
//   window.requestAnimationFrame(update)
// }
//
// // const FLOOR_Y = Math.floor(CANVAS_HEIGHT * 0.5 - 2)
//
// // const player = createEntityOfType(
// //   ENTITY_TYPES.PLAYER,
// //   { x: Math.floor(CANVAS_WIDTH * 0.5), y: FLOOR_Y },
// // )
//
// // let grounded = false
// // const INITIAL_JUMP_SPEED = -45
//
// // const jump = () => {
// //   if (grounded) {
// //     player.speed.y = INITIAL_JUMP_SPEED
// //     grounded = false
// //   }
// // }
//
// // const floors = []
// //
// // const floors4 = []
// //
// // for (let i = 0; i < 8; i++) {
// //   floors4.push({
// //     image: ground,
// //     x: 10 * i,
// //     y: 23,
// //     // w: 10,
// //     // h: 5,
// //   })
// // }
//
// // for (let i = 0; i < 4; i++) {
// //   floors.push({
// //     x: 20 * i,
// //     y: 28,
// //     w: 20,
// //     h: 10,
// //   })
// // }
// //
// // const floors2 = []
// //
// // for (let i = 0; i < 2; i++) {
// //   floors2.push({
// //     x: 40 * i,
// //     y: 28,
// //     w: 20,
// //     h: 10,
// //   })
// // }
// //
// // const floors3 = []
// //
// // for (let i = 0; i < 2; i++) {
// //   floors3.push({
// //     x: 40 * i + 20,
// //     y: 28,
// //     w: 20,
// //     h: 10,
// //   })
// // }
// //
// // for (let i = 0; i < 2; i++) {
// //   floors.push({
// //     x: 40 * i,
// //     y: 38,
// //     w: 40,
// //     h: 20,
// //   })
// // }
//
// // const key = {
// //   x: 10,
// //   y: 10,
// //   image: keyImage,
// //   collider: {
// //     x: 10,
// //     y: 10,
// //     w: keyImage.w,
// //     h: keyImage.h,
// //   },
// // }
//
// // const door = {
// //   x: 60,
// //   y: 17,
// //   image: doorImage,
// // }
//
// // const waters = []
// //
// // for (let i = 0; i < 2; i++) {
// //   waters.push({
// //     x: 10,
// //     y: (5 * i) + 28,
// //     image: waterImage,
// //     frame: 0,
// //     accumulator: 0,
// //   })
// // }
//
// // const waterBeds = []
// // for (let i = 0; i < 15; i++) {
// //   waters.push({
// //     x: i * 5,
// //     y: CANVAS_HEIGHT - 2,
// //     image: waterBedImage,
// //     frame: 0,
// //   })
// // }
// //
// // const waterDrain = {
// //   x: 10,
// //   y: 23,
// //   frame: 0,
// //   image: waterDrainImage
// // }
//
// // let keyCollected = false
// // let firstRender = true
//
// const camera = new Camera(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
// const level = new Level(
//   startScene.w,
//   startScene.h,
//   createEntities(startScene.entities)
// )
//
// const update = () => {
//   window.requestAnimationFrame(update)
//
//   currentTime = (new Date()).getTime()
//   dt = (currentTime - lastTime) / 1000
//
//   // const lastPos = { x: player.x, y: player.y }
//
//   // if (getActionState('left')) {
//   //   player.x -= X_SPEED * dt
//   // }
//   // if (getActionState('right')) {
//   //   player.x += X_SPEED * dt
//   // }
//
//   // if (player.x > CANVAS_WIDTH) {
//   //   player.x = -player.w
//   // }
//   //
//   // if (player.x < -player.w) {
//   //   player.x = CANVAS_WIDTH
//   // }
//
//   // player.speed.y += GRAVITY * dt
//   // player.y += player.speed.y * dt
//   //
//   // if (player.y > FLOOR_Y) {
//   //   grounded = true
//   //   player.y = FLOOR_Y
//   //   player.speed.y = 0
//   // }
//   //
//   // player.collider.x = player.x
//   // player.collider.y = player.y
//
//   // if (!keyCollected && rectanglesOverlap(player.collider, key.collider)) {
//   //   door.image = doorImageOpen
//   //   keyCollected = true
//   // }
//
//   // const FRAME_LENGTH = 0.125
//   // waters.forEach(water => {
//   //   water.accumulator += dt
//   //
//   //   while (water.accumulator > FRAME_LENGTH) {
//   //     water.accumulator -= FRAME_LENGTH
//   //     water.frame++
//   //     if (water.frame > water.image.frames.length - 1) {
//   //       water.frame = 0
//   //     }
//   //   }
//   // })
//   //
//   // if (keyCollected && remainingPixels.length > 0) {
//   //   for (let i = 0; i < 10; i++) {
//   //     if (remainingPixels.length > 0) {
//   //       swapRandomPixel()
//   //     }
//   //   }
//   // }
//
//   // camera.centerOnPosition(player.x, CANVAS_HEIGHT * 0.5)
//   // if (camera.x < 0) {
//   //   camera.x = 0
//   // }
//   // if (camera.x > level.w - camera.w) {
//   //   camera.x = level.w - camera.w
//   // }
//   // if (camera.y < 0) {
//   //   camera.y = 0
//   // }
//   // if (camera.y > level.h - camera.h) {
//   //   camera.y = level.h - camera.h
//   // }
//
//   // if (!(player.x === lastPos.x && player.y === lastPos.y) || firstRender) {
//   //   firstRender = false
//   level.update(dt)
//
//   render()
//   // }
//
//   lastTime = currentTime
// }
//
// const render = () => {
//   context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//
//   level.render(asciiCanvas, context, camera)
//   // if (!keyCollected) {
//   // context.drawImage(titleImage, 7 - camera.x, 1 - camera.y)
//   // if (keyCollected) {
//   //   context.drawImage(finalImage, 7 - camera.x, 1 - camera.y)
//   // }
//   // // context.setFill('%', COLORS.DARK_BLUE, COLORS.NAVY)
//   // // floors2.forEach(floor => {
//   // //   context.fillRect(Math.floor(floor.x), Math.floor(floor.y), floor.w, floor.h)
//   // // })
//   // // context.setFill('&', COLORS.NAVY, COLORS.PINK)
//   // // floors3.forEach(floor => {
//   // //   context.fillRect(Math.floor(floor.x), Math.floor(floor.y), floor.w, floor.h)
//   // // })
//   // // floors.forEach(floor => {
//   // //   context.strokeRect(Math.floor(floor.x), Math.floor(floor.y), floor.w, floor.h)
//   // // })
//   // floors4.forEach(floor => {
//   //   context.drawImage(floor.image, Math.floor(floor.x - camera.x), Math.floor(floor.y - camera.y))
//   // })
//   // context.drawImage(door.image, door.x - camera.x, door.y - camera.y)
//   // context.setFill('x', COLORS.WHITE, COLORS.NAVY)
//   // context.fillRect(Math.floor(player.x - camera.x), Math.floor(player.y - camera.y), player.w, player.h)
//   //
//   // if (!keyCollected) {
//   //   context.drawImage(key.image, key.x - camera.x, key.y - camera.y)
//   // }
//   //
//   // context.drawImage2(drawingImage, 0, 0)
//   //
//   // context.drawImage3(waterDrain.image, waterDrain.x - camera.x, waterDrain.y - camera.y, waterDrain.frame)
//   //
//   // waters.forEach(water => {
//   //   // console.log('_WATER_', water)
//   //   context.drawImage3(water.image, water.x - camera.x, water.y - camera.y, water.frame)
//   // })
//   //
//   // waterBeds.forEach(water => {
//   //   context.drawImage3(water.image, water.x - camera.x, water.y - camera.y, water.frame)
//   // })
//   // I should store the changes since the last frame somewhere
//   // Then I can use that to know what to update
//   asciiCanvas.updateDom()
// }
//
// init().then(() => {
//
// }).catch(() => {
//
// })
