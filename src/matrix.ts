import { Container, Application, Texture, Text, Ticker, Sprite } from "pixi.js"
import { config } from "./config"

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
    particles: (Sprite | null)[] = [] // Масив всіх позицій у стовбчику
    headIndex: number = -1 // Позиція поточного символу-X
    headSprite: Sprite | null = null
    textures: Texture[]
    headTextures: Texture[] // Окремі текстури для символів-X
    container: Container
    moveCounter: number = 0
    moveDelay: number = rand(0.05, 0.15) * 60 // Конвертуємо в кадри (при 60 FPS)
    headShuffleSpeed: number = 2.1
    headShuffleCounter: number = 0
    columnLength: number = 0 // Поточна довжина стовбчика в символах
    maxLength: number = 0 // Максимальна довжина стовбчика
    alphaStep: number = 0 // Крок прозорості
    isActive: boolean = false
    restartDelay: number = 0
    totalRows: number = 0 // Загальна кількість рядків (екран + стовбчик)
    columnCompleted: boolean = false // Чи весь стовбчик пройшов екран
    screenRows: number = 0 // Кількість рядків на екрані

    constructor(
        x: number,
        screenHeight: number,
        container: Container,
        textures: Texture[],
        headTextures: Texture[]
    ) {
        this.x = x
        this.screenHeight = screenHeight
        this.container = container
        this.textures = textures
        this.headTextures = headTextures

        // Розраховуємо кількість рядків на екрані
        this.screenRows = Math.floor(screenHeight / config.symbolSize)

        // Рандомна довжина стовбчика (30-80% висоти екрану)
        const columnHeightPercent = rand(30, 80) / 100
        const columnHeight = screenHeight * columnHeightPercent
        this.maxLength = Math.floor(columnHeight / config.symbolSize)
        this.alphaStep = 1 / this.maxLength

        // Загальна кількість рядків = висота екрану + довжина стовбчика
        this.totalRows = this.screenRows + this.maxLength
        this.particles = new Array(this.totalRows).fill(null)

        // Починаємо з затримкою
        this.restartDelay = rand(0, 100)
    }

    getRandomTexture() {
        return this.textures[Math.floor(Math.random() * this.textures.length)]
    }

    getRandomHeadTexture() {
        return this.headTextures[Math.floor(Math.random() * this.headTextures.length)]
    }

    createHead() {
        if (this.headIndex === -1 && !this.columnCompleted) {
            const texture = this.getRandomHeadTexture()
            const sprite = new Sprite(texture)
            sprite.x = this.x
            sprite.y = -1 * config.symbolSize // top offset hotfix
            sprite.alpha = 1
            this.container.addChild(sprite)
            this.headSprite = sprite
            this.headIndex = 0
            this.columnLength = 1
            this.isActive = true
            this.columnCompleted = false
            this.particles[0] = sprite
        }
    }

    moveHead() {
        if (!this.headSprite || this.headIndex === -1) return

        // Зберігаємо поточний стан символу-X як символ-A1
        const currentIndex = this.headIndex
        const currentSprite = this.headSprite

        if (currentIndex > 0) {
            // Копіюємо символ-X в символ-A1 на попередній позиції
            // Для символів-A використовуємо звичайні текстури (без тіні)
            const prevTexture = this.getRandomHeadTexture()
            const prevSprite = new Sprite(prevTexture)
            prevSprite.x = this.x
            prevSprite.y = currentSprite.y
            prevSprite.tint = config.mainColor

            // Встановлюємо прозорість згідно з формулою
            const stepIndex = this.columnLength - 1
            prevSprite.alpha = Math.max(0, 1 - this.alphaStep * stepIndex)

            this.container.addChild(prevSprite)
            this.particles[currentIndex] = prevSprite
        }

        // Переміщаємо символ-X вниз
        const nextIndex = currentIndex + 1
        currentSprite.y += config.symbolSize
        this.headIndex = nextIndex

        // Перевіряємо чи не досягли максимальної довжини
        if (this.columnLength >= this.maxLength) {
            // Очищуємо найстаріший символ
            const oldestIndex = nextIndex - this.maxLength
            if (oldestIndex >= 0 && this.particles[oldestIndex]) {
                this.container.removeChild(this.particles[oldestIndex]!)
                this.particles[oldestIndex] = null
            }
        } else {
            // Збільшуємо довжину стовбчика
            this.columnLength++
        }

        // Перевіряємо чи не натикаємося на існуючий символ
        if (this.particles[nextIndex]) {
            this.container.removeChild(this.particles[nextIndex]!)
        }

        // Переміщаємо символ-X на нову позицію
        this.particles[nextIndex] = currentSprite

        // Перевіряємо чи символ-X пройшов всю відстань (екран + довжина стовбчика)
        if (nextIndex >= this.totalRows - 1) {
            // Символ-X пройшов всю відстань
            this.container.removeChild(currentSprite)
            this.headSprite = null
            this.headIndex = -1
            this.isActive = false
            this.columnCompleted = true

            // Очищаємо всі символи, які залишилися
            for (let i = 0; i < this.particles.length; i++) {
                if (this.particles[i]) {
                    this.container.removeChild(this.particles[i]!)
                    this.particles[i] = null
                }
            }

            // Затримка перед новим стовбчиком
            this.restartDelay = rand(30, 180)
        }
    }

    update(time: Ticker) {
        // Обробка затримки перед стартом
        if (this.restartDelay > 0) {
            this.restartDelay -= time.deltaTime

            // Якщо стовбчик завершився і пройшла затримка, скидаємо стан
            if (this.restartDelay <= 0 && this.columnCompleted) {
                this.columnCompleted = false
                this.columnLength = 0
                this.particles = new Array(this.totalRows).fill(null)
            }
            return
        }

        // Створення нового символу-X якщо потрібно
        if (!this.isActive && this.headIndex === -1 && !this.columnCompleted) {
            this.createHead()
            return
        }

        // Оновлення символу-X
        if (this.headSprite) {
            // Зміна символу-X
            this.headShuffleCounter += time.deltaTime
            if (this.headShuffleCounter > this.headShuffleSpeed) {
                this.headShuffleCounter = 0
                this.headSprite.texture = this.getRandomHeadTexture()
            }

            // Рух вниз
            this.moveCounter += time.deltaTime
            if (this.moveCounter > this.moveDelay) {
                this.moveCounter = 0
                this.moveHead()
            }
        }

        // Оновлення прозорості всіх символів у стовбчику
        for (let i = 0; i < this.particles.length; i++) {
            const sprite = this.particles[i]
            if (sprite && sprite !== this.headSprite) {
                // Розраховуємо прозорість на основі позиції відносно головного символу
                const distanceFromHead = this.headIndex - i
                if (distanceFromHead > 0) {
                    sprite.alpha = Math.max(0.1, 1 - this.alphaStep * distanceFromHead)
                }
            }
        }
    }
}

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min
}
