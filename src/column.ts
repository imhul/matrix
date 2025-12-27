import { Container, Texture, Ticker, Sprite } from "pixi.js"
import { config, rand } from "./config"
import { Head } from "./types"


export class Column {
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
    particleShuffleTimers: Map<Sprite, number> = new Map()
    minParticleShuffleTime: number = config.minShuffleSpeed * 60
    maxParticleShuffleTime: number = config.maxShuffleSpeed * 60

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

        const topHead = this.heads.reduce((closest, head) => {
            if (!closest || head.index < closest.index) return head
            return closest
        }, null as Head | null)

        if (!topHead) return true
        const tailIndex = Math.max(0, topHead.index - topHead.maxLength)
        const distance = Math.abs(0 - tailIndex)

        return distance >= 1 && distance <= 10
    }

    createHead() {
        if (this.heads.length >= 2) return

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

        const nextIndex = head.index + 1
        const otherHeads = this.heads.filter(h => h !== head)

        for (const otherHead of otherHeads) {
            const distance = Math.abs(nextIndex - otherHead.index)
            const otherTailIndex = Math.max(0, otherHead.index - otherHead.maxLength)
            const distanceToTail = Math.abs(nextIndex - otherTailIndex)

            if (distance < 5 || distanceToTail < 5) {
                head.moveDelay = Math.min(head.moveDelay * 1.5, 0.3 * 60)
                return
            }
        }

        const currentIndex = head.index
        const currentSprite = head.sprite

        if (currentIndex > 0) {
            const prevTexture = this.getRandomHeadTexture()
            const prevSprite = new Sprite(prevTexture)
            const stepIndex = head.length - 1
            prevSprite.x = this.x
            prevSprite.y = currentSprite.y
            prevSprite.tint = config.mainColor
            prevSprite.alpha = Math.max(0, 1 - head.alphaStep * stepIndex)

            this.particleShuffleTimers.set(
                prevSprite,
                rand(this.minParticleShuffleTime, this.maxParticleShuffleTime)
            )

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

            for (let i = 0; i < head.particles.length; i++) {
                if (head.particles[i]) {
                    this.container.removeChild(head.particles[i]!)
                }
            }

            this.heads = this.heads.filter(h => h !== head)
        }
    }

    update(time: Ticker) {
        if (this.restartDelay > 0) {
            this.restartDelay -= time.deltaTime
            return
        }

        const spawnChance = Math.random() < 0.005
        if (spawnChance) {
            this.createHead()
        }

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
                head.moveDelay = rand(0.05, 0.15) * 60
            }

            for (let j = 0; j < head.particles.length; j++) {
                const sprite = head.particles[j]
                if (sprite && sprite !== head.sprite) {
                    const distanceFromHead = head.index - j
                    if (distanceFromHead > 0) {
                        sprite.alpha = Math.max(0.1, 1 - head.alphaStep * distanceFromHead)
                    }

                    if (this.particleShuffleTimers.has(sprite)) {
                        let timer = this.particleShuffleTimers.get(sprite)! - time.deltaTime

                        if (timer <= 0) {
                            sprite.texture = this.getRandomTexture()
                            sprite.tint = config.mainColor
                            timer = rand(this.minParticleShuffleTime, this.maxParticleShuffleTime)
                        }

                        this.particleShuffleTimers.set(sprite, timer)
                    }
                }
            }
        }

        this.cleanupShuffleTimers()

        if (this.heads.length === 0 && !this.columnCompleted) {
            this.columnCompleted = true
            this.restartDelay = rand(30, 180)
        }
    }

    cleanupShuffleTimers() {
        const spritesToRemove: Sprite[] = []

        this.particleShuffleTimers.forEach((_, sprite) => {
            let found = false

            for (const head of this.heads) {
                if (head.particles.includes(sprite)) {
                    found = true
                    break
                }
            }

            if (!found) {
                spritesToRemove.push(sprite)
            }
        })

        spritesToRemove.forEach(sprite => {
            this.particleShuffleTimers.delete(sprite)
        })
    }
}
