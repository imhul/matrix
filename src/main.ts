import { Application } from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import { Matrix } from './matrix'
import { appConfig, glowFilterConfig, updateConfig } from './config'

    // app
    ; (async () => {
        const app = new Application()
        await app.init(appConfig)
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
                minFallSpeed: parseFloat((document.getElementById('minFallSpeed') as HTMLInputElement).value),
                maxFallSpeed: parseFloat((document.getElementById('maxFallSpeed') as HTMLInputElement).value),
                headShuffleSpeed: parseInt((document.getElementById('headShuffleSpeed') as HTMLInputElement).value),
                newHeadChance: parseFloat((document.getElementById('newHeadChance') as HTMLInputElement).value),
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
