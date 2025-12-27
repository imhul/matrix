import { Container, Application, Texture, Text, Ticker, Sprite } from "pixi.js"
import { config, rand } from "./config"
import { Head } from "./types"

export class Matrix {
    app: Application
    particleContainer: Container
    columns: Column[] = []
    textures: Texture[] = []
    headTextures: Texture[] = [] // Окремі текстури для символів-X

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

        // Створюємо текстури для звичайних символів
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

        // Створюємо окремі текстури для символів-X (білі з тінню)
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

class Column {
    x: number
    screenHeight: number
    particles: (Sprite | null)[] = []
    heads: Head[] = []
    textures: Texture[]
    headTextures: Texture[]
    container: Container
    totalRows: number = 0
    screenRows: number = 0
    restartDelay: number = 0
    columnCompleted: boolean = false
    maxLength: number = 0
    alphaStep: number = 0

    constructor(
        x: number,
        screenHeight: number,
        container: Container,
        textures: Texture[],
        headTextures: Texture[]
    ) {
        const columnHeightPercent = rand(30, 80) / 100
        const columnHeight = screenHeight * columnHeightPercent

        this.x = x
        this.screenHeight = screenHeight
        this.container = container
        this.textures = textures
        this.headTextures = headTextures
        this.screenRows = Math.floor(screenHeight / config.symbolSize)
        this.maxLength = Math.floor(columnHeight / config.symbolSize)
        this.alphaStep = 1 / this.maxLength
        this.totalRows = this.screenRows + this.maxLength
        this.particles = new Array(this.totalRows).fill(null)
        this.restartDelay = rand(0, 100)
    }

    getRandomTexture() {
        return this.textures[Math.floor(Math.random() * this.textures.length)]
    }

    getRandomHeadTexture() {
        return this.headTextures[Math.floor(Math.random() * this.headTextures.length)]
    }

    canCreateNewHead(): boolean {
        if (this.heads.length === 0) return true

        // Знаходимо найближчу голову зверху
        const topHead = this.heads.reduce((closest, head) => {
            if (!closest || head.index < closest.index) return head
            return closest
        }, null as Head | null)

        if (!topHead) return true

        // Визначаємо позицію "хвоста" найближчої голови
        // Хвіст - це символ з максимальною прозорістю (найстаріший)
        const tailIndex = Math.max(0, topHead.index - topHead.maxLength)

        // Відстань між хвостом попередньої голови та новою головою (яка буде на позиції 0)
        const distance = Math.abs(0 - tailIndex)

        // Відстань має бути від 1 до 10 символів
        return distance >= 1 && distance <= 10
    }

    createHead() {
        if (this.heads.length >= 2) return // Максимум 2 голови

        // Перевіряємо відстань до найближчої голови або хвоста
        const canCreate = this.canCreateNewHead()
        if (!canCreate) return

        const texture = this.getRandomHeadTexture()
        const sprite = new Sprite(texture)
        sprite.x = this.x
        sprite.y = -1 * config.symbolSize
        sprite.alpha = 1
        sprite.tint = config.firstColor
        sprite.label = "head"
        this.container.addChild(sprite)

        const head = {
            sprite,
            index: 0,
            length: 1,
            moveCounter: 0,
            shuffleCounter: 0,
            moveDelay: rand(0.05, 0.15) * 60,
            maxLength: Math.floor(this.screenHeight * rand(30, 80) / 100 / config.symbolSize),
            alphaStep: 0,
            particles: new Array(this.totalRows).fill(null)
        }
        head.alphaStep = 1 / head.maxLength
        head.particles[0] = sprite

        this.heads.push(head)
    }

    moveHead(head: Head) {
        if (!head.sprite) return

        // Перевіряємо, чи нова позиція не занадто близько до іншої голови
        const nextIndex = head.index + 1
        const otherHeads = this.heads.filter(h => h !== head)

        for (const otherHead of otherHeads) {
            // Відстань між головами
            const distance = Math.abs(nextIndex - otherHead.index)
            // Відстань до хвоста іншої голови
            const otherTailIndex = Math.max(0, otherHead.index - otherHead.maxLength)
            const distanceToTail = Math.abs(nextIndex - otherTailIndex)

            // Якщо занадто близько до іншої голови або її хвоста
            if (distance < 5 || distanceToTail < 5) {
                // Трохи сповільнюємо рух
                head.moveDelay = Math.min(head.moveDelay * 1.5, 0.3 * 60)
                return
            }
        }

        const currentIndex = head.index
        const currentSprite = head.sprite

        if (currentIndex > 0) {
            const prevTexture = this.getRandomHeadTexture()
            const prevSprite = new Sprite(prevTexture)
            prevSprite.x = this.x
            prevSprite.y = currentSprite.y
            prevSprite.tint = config.mainColor

            const stepIndex = head.length - 1
            prevSprite.alpha = Math.max(0, 1 - head.alphaStep * stepIndex)

            this.container.addChild(prevSprite)
            head.particles[currentIndex] = prevSprite
        }

        currentSprite.y += config.symbolSize
        head.index = nextIndex
        currentSprite.tint = config.firstColor

        if (head.length >= head.maxLength) {
            const oldestIndex = nextIndex - head.maxLength
            if (oldestIndex >= 0 && head.particles[oldestIndex] && head.particles[oldestIndex] !== head.sprite) {
                this.container.removeChild(head.particles[oldestIndex]!)
                head.particles[oldestIndex] = null
            }
        } else {
            head.length++
        }

        if (head.particles[nextIndex]) {
            this.container.removeChild(head.particles[nextIndex]!)
        }

        head.particles[nextIndex] = currentSprite

        if (nextIndex >= this.totalRows - 1) {
            this.container.removeChild(currentSprite)

            // Видаляємо всі символи цієї голови
            for (let i = 0; i < head.particles.length; i++) {
                if (head.particles[i]) {
                    this.container.removeChild(head.particles[i]!)
                }
            }

            // Видаляємо голову з масиву
            this.heads = this.heads.filter(h => h !== head)
        }
    }

    update(time: Ticker) {
        if (this.restartDelay > 0) {
            this.restartDelay -= time.deltaTime
            return
        }

        // Зменшуємо шанс створення нової голови
        const spawnChance = Math.random() < 0.005 // 0.5% шанс кожен кадр
        if (spawnChance) {
            this.createHead()
        }

        // Оновлюємо кожну голову
        for (let i = this.heads.length - 1; i >= 0; i--) {
            const head = this.heads[i]

            head.shuffleCounter += time.deltaTime
            if (head.shuffleCounter > config.headShuffleSpeed) {
                head.shuffleCounter = 0
                head.sprite.texture = this.getRandomHeadTexture()
                head.sprite.tint = config.firstColor
            }

            head.moveCounter += time.deltaTime
            if (head.moveCounter > head.moveDelay) {
                head.moveCounter = 0
                this.moveHead(head)
                // Відновлюємо нормальну швидкість
                head.moveDelay = rand(0.05, 0.15) * 60
            }

            // Оновлення прозорості символів цієї голови
            for (let j = 0; j < head.particles.length; j++) {
                const sprite = head.particles[j]
                if (sprite && sprite !== head.sprite) {
                    const distanceFromHead = head.index - j
                    if (distanceFromHead > 0) {
                        sprite.alpha = Math.max(0.1, 1 - head.alphaStep * distanceFromHead)
                    }
                }
            }
        }

        if (this.heads.length === 0 && !this.columnCompleted) {
            this.columnCompleted = true
            this.restartDelay = rand(30, 180)
        }
    }
}
