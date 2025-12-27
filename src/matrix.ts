import { Container, Application, Texture, Text, Ticker } from "pixi.js"
import { Column } from "./column"
import { config } from "./config"


export class Matrix {
    app: Application
    particleContainer: Container
    columns: Column[] = []
    textures: Texture[] = []
    headTextures: Texture[] = []

    constructor(app: Application) {
        this.app = app
        this.particleContainer = new Container()
        app.stage.addChild(this.particleContainer)
        this.generateTextures()
        this.createColumns()

        app.ticker.add((time) => {
            this.update(time)
        })
    }

    generateTextures() {
        const chars = config.characters

        for (let i = 0; i < chars.length; i++) {
            const textObj = new Text({
                text: chars[i],
                style: {
                    fontFamily: "monospace",
                    fontSize: config.symbolSize,
                    fill: config.mainColor,
                    dropShadow: {
                        color: config.whiteShadowColor,
                        blur: 10,
                        distance: 8,
                        angle: Math.PI / 2
                    }
                }
            })
            this.textures.push(this.app.renderer.generateTexture(textObj))
        }

        for (let i = 0; i < chars.length; i++) {
            const textObj = new Text({
                text: chars[i],
                style: {
                    fontFamily: "monospace",
                    fontSize: config.symbolSize,
                    fill: config.firstColor,
                    dropShadow: {
                        color: config.whiteShadowColor,
                        blur: 10,
                        distance: 8,
                        angle: Math.PI / 2
                    }
                }
            })
            this.headTextures.push(this.app.renderer.generateTexture(textObj))
        }
    }

    createColumns() {
        const w = this.app.renderer.width
        const cols = Math.floor(w / config.symbolSize)

        for (let i = 0; i < cols; i++) {
            const column = new Column(
                i * config.symbolSize,
                this.app.renderer.height,
                this.particleContainer,
                this.textures,
                this.headTextures
            )
            this.columns.push(column)
        }
    }

    update = (time: Ticker) => {
        this.columns.forEach(col => col.update(time))
    }

    reset() {
        this.particleContainer.removeChildren()
        this.columns = []
        this.createColumns()
    }
}
