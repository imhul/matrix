import { Application } from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import { Matrix } from './matrix'
import { appConfig, glowFilterConfig, updateConfig, config } from './config'

async function showWelcomeScreen(): Promise<void> {
	return new Promise((resolve) => {
		const phrase = config.phrase[Math.floor(Math.random() * config.phrase.length)]

		const welcomeDiv = document.createElement('div')
		welcomeDiv.id = 'welcome-screen'
		welcomeDiv.style.cssText = `
            position: fixed;
            top: 50px;
            left: 50px;
            background: #000000;
            z-index: 9999;
            font-family: monospace;
            font-size: 32px;
            color: #00DB00;
            text-shadow: 0 0 10px #00DB00;
        `

		const textSpan = document.createElement('span')
		welcomeDiv.appendChild(textSpan)
		document.body.appendChild(welcomeDiv)

		let currentIndex = 0
		const typingSpeed = 100

		const typeWriter = () => {
			if (currentIndex < phrase.length) {
				textSpan.textContent += phrase.charAt(currentIndex)
				currentIndex++
				setTimeout(typeWriter, typingSpeed)
			} else {
				const cursor = document.createElement('span')
				cursor.textContent = '_'
				cursor.style.animation = 'blink 1s infinite'
				textSpan.appendChild(cursor)

				const style = document.createElement('style')
				style.textContent = `
                    @keyframes blink {
                        0%, 49% { opacity: 1; }
                        50%, 100% { opacity: 0; }
                    }
                `
				document.head.appendChild(style)

				const removeScreen = () => {
					welcomeDiv.style.transition = 'opacity 1s'
					welcomeDiv.style.opacity = '0'
					setTimeout(() => {
						welcomeDiv.remove()
						resolve()
					}, 1000)
				}

				welcomeDiv.addEventListener('click', removeScreen)
				setTimeout(removeScreen, 3000)
			}
		}

		setTimeout(typeWriter, 500)
	})
}

// app
;(async () => {
	const app = new Application()
	await app.init(appConfig)
	await showWelcomeScreen()

	document.getElementById('matrix-rain')!.appendChild(app.canvas)
	app.stage.filters = [new GlowFilter(glowFilterConfig)]
	let matrix = new Matrix(app)
	let open = false

	const settingsPanel = document.getElementById('settings-panel')!
	const applyButton = document.getElementById('apply-settings')!
	const inputs = settingsPanel.querySelectorAll('input[type="range"]')

	inputs.forEach((input) => {
		const inputElement = input as HTMLInputElement
		const valueDisplay = document.getElementById(`${inputElement.id}-val`)!

		inputElement.addEventListener('input', () => {
			valueDisplay.textContent = inputElement.value
		})
	})

	const close = () => {
		settingsPanel.classList.remove('open')
		open = false
	}

	applyButton.addEventListener('click', () => {
		const newConfig = {
			minFallSpeed: parseFloat(
				(document.getElementById('minFallSpeed') as HTMLInputElement).value
			),
			maxFallSpeed: parseFloat(
				(document.getElementById('maxFallSpeed') as HTMLInputElement).value
			),
			headShuffleSpeed: parseInt(
				(document.getElementById('headShuffleSpeed') as HTMLInputElement).value
			),
			newHeadChance: parseFloat(
				(document.getElementById('newHeadChance') as HTMLInputElement).value
			),
			symbolSize: parseInt((document.getElementById('symbolSize') as HTMLInputElement).value),
			minChain: parseInt((document.getElementById('minChain') as HTMLInputElement).value),
			maxChain: parseInt((document.getElementById('maxChain') as HTMLInputElement).value)
		}

		updateConfig(newConfig)
		matrix.reset()
		close()
	})

	window.addEventListener('keyup', (e) => {
		if (e.key === 'r' || e.key === 'R') matrix.reset()
		if (e.key === 'Escape' || e.key === 'Esc' || e.key === 's' || e.key === 'S') {
			if (open) {
				close()
			} else {
				settingsPanel.classList.add('open')
				open = true
			}
		}
	})

	window.addEventListener('resize', () => {
		matrix.reset()
	})
})()
