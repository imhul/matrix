import { Container, Application, Texture, Text, Ticker, Sprite } from "pixi.js"
import { config } from "./config"

export class Matrix {
    app: Application
    particleContainer: Container
    columns: Column[] = []
    textures: Texture[] = []

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
                        color: config.firstColor,
                        blur: 10,
                        distance: 4,
                        angle: Math.PI / 2
                    }
                }
            })
            this.textures.push(this.app.renderer.generateTexture(textObj))
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
                this.textures
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

class Column {
    x: number
    h: number
    particles: Sprite[] = []
    shuffleCounter: number = 0
    textures: Texture[]
    container: Container
    fallspeed: number = 0
    headShuffleSpeed: number = 2.1
    headShuffleCounter: number = 0

    constructor(
        x: number,
        height: number,
        container: Container,
        textures: Texture[]
    ) {
        this.x = x
        this.h = height
        this.container = container
        this.textures = textures
        this.fallspeed = rand(config.minFallSpeed, config.maxFallSpeed)
        this.createChain()
    }

    createChain() {
        const length = rand(config.minChain, config.maxChain)
        for (let i = 0; i < length; i++) {
            const texture = this.getRandomTexture()
            const particle = new Sprite(texture)
            particle.x = this.x
            particle.y = -i * config.symbolSize
            const t = (length - 1 - i) / (length - 1)
            particle.alpha = 0.25 + t * 0.75
            particle.tint = i === 0 ? config.firstColor : config.mainColor
            this.particles.push(particle)
            this.container.addChild(particle)
        }
    }

    getRandomTexture() {
        return this.textures[Math.floor(Math.random() * this.textures.length)]
    }

    update(time: Ticker) {
        this.shuffleCounter += time.deltaTime
        const shuffleSpeed = rand(config.minShuffleSpeed, config.maxShuffleSpeed)
        if (this.shuffleCounter > shuffleSpeed) {
            this.shuffleCounter = 0
            const index = rand(0, this.particles.length - 2)
            this.particles[index].texture = this.getRandomTexture()
        }

        const head = this.particles[0]
        head.tint = config.firstColor

        this.headShuffleCounter += time.deltaTime
        if (this.headShuffleCounter > this.headShuffleSpeed) {
            this.headShuffleCounter = 0
            head.texture = this.getRandomTexture()
        }

        for (let sprite of this.particles) {
            const speed = this.fallspeed * time.deltaTime
            sprite.y += speed
            if (sprite.y > this.h) {
                sprite.y = -this.particles.length * config.symbolSize
            }
        }
    }
}

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
