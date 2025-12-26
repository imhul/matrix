import { Application } from "pixi.js"
import { Matrix } from './matrix'

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

