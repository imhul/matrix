import { Application } from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import { Matrix } from './matrix'
import { config } from './config'

// app
;(async () => {
	const app = new Application()
	await app.init({
		background: config.bgColor,
		resizeTo: window,
		resolution: window.devicePixelRatio || 1,
		autoDensity: true,
		antialias: false
	})
	document.getElementById('matrix-rain')!.appendChild(app.canvas)

	app.stage.filters = [new GlowFilter(config.glowFilterConfig)]

	const matrix = new Matrix(app)

	window.addEventListener('keyup', (e) => {
		if (e.key === 'r' || e.key === 'R') matrix.reset()
	})

	window.addEventListener('resize', () => {
		matrix.reset()
	})
})()
