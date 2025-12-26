import { Application, Assets, Sprite } from "pixi.js"
import { Matrix } from './matrix'

// (async () => {
//     const app = new Application()
//     await app.init({ background: "#000000ff", resizeTo: window })
//     document.getElementById("pixi-container")!.appendChild(app.canvas)

//     const texture = await Assets.load("/assets/bunny.png")
//     const bunny = new Sprite(texture)
//     bunny.anchor.set(0.5)
//     bunny.position.set(app.screen.width / 2, app.screen.height / 2)

//     app.stage.addChild(bunny)

//     app.ticker.add((time) => {
//         bunny.rotation += 0.1 * time.deltaTime
//     })
// })()


(async () => {
    const app = new Application()
    await app.init({ background: "#000000ff", resizeTo: window })
    document.getElementById("pixi-container")!.appendChild(app.canvas)

    const matrix = new Matrix(app)

    // ===== KEYBOARD =====
    window.addEventListener('keyup', (e) => {
        if (e.key === 'r' || e.key === 'R') matrix.reset()
    })
})()

