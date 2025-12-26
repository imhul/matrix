import {
    Sprite,
    Color,
    Graphics,
    Container,
    Application,
    RenderTexture,
} from 'pixi.js'
import {
    symbols,
    symbolSize,
    symbolScale,
    minChainSize,
    maxChainSize,
    symbolsCount,
    getRandomNumber,
    firstSymbolColor,
    matrixColor,
    minWaterfallSpeed,
    maxWaterfallSpeed,
    symbolShuffleSpeed,
} from './config'
import type { Symbol, Matrix as MatrixType } from './types'

const toPixiColor = (hex: string) => Number(`0x${hex.slice(1)}`)

export class Matrix {
    app: Application;
    matrix: MatrixType = [];
    pathCache: Map<string, Graphics> = new Map();
    columnTextures: RenderTexture[] = [];
    container: Container;

    constructor(app: Application) {
        this.app = app
        this.container = new Container()
        app.stage.addChild(this.container)

        this.init()
        app.ticker.add(this.update)
    }

    reset = () => {
        this.container.removeChildren()
        this.matrix = []
        this.init()
    };

    init() {
        const cols = Math.ceil(this.app.renderer.width / symbolSize)
        for (let i = 0; i < cols; i++) {
            this.matrix.push(this.getNewUnit())
            this.createColumn(i)
        }
    }

    /** --- MATRIX UNIT --- */
    getY = () => -Math.random() * this.app.renderer.height
    getSpeed = () =>
        Math.random() / getRandomNumber(minWaterfallSpeed, maxWaterfallSpeed)
    getChainLength = () =>
        Math.floor(getRandomNumber(minChainSize, maxChainSize))
    getRandomSymbolIndex = () => Math.floor(Math.random() * symbolsCount)
    getChain = () =>
        Array.from({ length: this.getChainLength() }, () =>
            this.getRandomSymbolIndex()
        )

    getNewUnit = () => ({
        chain: this.getChain(),
        speed: this.getSpeed(),
        y: this.getY()
    })

    /** --- SVG → Graphics CACHE --- */
    getPathGraphic = (symbol: Symbol) => {
        if (this.pathCache.has(symbol.d)) return this.pathCache.get(symbol.d)!

        const g = new Graphics()
        g.svg(symbol.d)
        this.pathCache.set(symbol.d, g)
        return g
    };

    /** --- COLUMN CREATION --- */
    createColumn(col: number) {
        const unit = this.matrix[col];
        const columnContainer = new Container();

        unit.chain.forEach((symbolIndex, j) => {
            const isFirstSymbol = j === unit.chain.length - 1

            const symbol = symbols[symbolIndex]
            const g = this.getPathGraphic(symbol)

            const s = new Sprite(this.getSymbolTexture(g))

            s.scale.set(symbolScale)
            s.x = col * symbolSize
            s.y = unit.y + j * (symbolSize + 15)

            s.tint = isFirstSymbol ? toPixiColor(firstSymbolColor) : toPixiColor(matrixColor)

            s.alpha = 0.02 + (1 - 0.2) * (j / (unit.chain.length - 1))

            columnContainer.addChild(s)
        });

        this.container.addChild(columnContainer)
    }

    /** --- Render Graphics into Texture --- */
    getSymbolTexture = (graphic: Graphics): RenderTexture => {
        const bounds = graphic.getLocalBounds()
        const tex = RenderTexture.create({
            width: bounds.width,
            height: bounds.height
        })
        this.app.renderer.render(graphic, { renderTexture: tex })
        return tex
    }

    /** --- RENDER --- */
    update = () => {
        for (let col = 0; col < this.matrix.length; col++) {
            const unit = this.matrix[col]
            const column = this.container.children[col] as Container

            unit.y += unit.speed

            if (unit.y > this.app.renderer.height) {
                this.matrix[col] = this.getNewUnit()
                this.container.removeChild(column)
                this.createColumn(col)
                continue
            }

            for (let j = 0; j < column.children.length; j++) {
                const sprite = column.children[j] as Sprite

                const isFirst = j === unit.chain.length - 1

                // shuffle symbol
                if (
                    !isFirst &&
                    Math.random() * 100 > 100 - j * symbolShuffleSpeed
                ) {
                    const rnd = symbols[this.getRandomSymbolIndex()]
                    const g = this.getPathGraphic(rnd)
                    sprite.texture = this.getSymbolTexture(g)
                }

                sprite.x = col * symbolSize
                sprite.y = unit.y + j * (symbolSize + 15)
            }
        }
    }
}
