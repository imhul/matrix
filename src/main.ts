import { Application } from "pixi.js"
import { GlowFilter } from 'pixi-filters';
import { Matrix } from './matrix'
import { config } from "./config";

(async () => {
    const app = new Application()
    await app.init({ background: "#000000ff", resizeTo: window })
    document.getElementById("matrix-rain")!.appendChild(app.canvas)

    app.stage.filters = [
        new GlowFilter(config.glowFilterConfig)
    ]

    const matrix = new Matrix(app)

    window.addEventListener('keyup', (e) => {
        if (e.key === 'r' || e.key === 'R') matrix.reset()
    })
})()
