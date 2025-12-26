const symbols = [

]

const bgColor = '#000'
const symbolsCount = symbols.length
const matrixColor = '#ADF69C'
const shadowColor = '#197332'
const firstSymbolColor = '#ACFFD7'
const symbolSize = 3; // 1.6
const symbolScale = 0.02
const minWaterfallSpeed = 4
const maxWaterfallSpeed = 9
const minChainSize = 30; // percentage of the screen
const maxChainSize = 50; // percentage of the screen
const symbolShuffleSpeed = 0.1; // not for first symbol in chain
const getRandomNumber = (min: number, max: number) => { return Math.floor(Math.random() * (max - min) + min) }

export { symbols, bgColor, symbolSize, matrixColor, shadowColor, symbolScale, minChainSize, maxChainSize, symbolsCount, getRandomNumber, firstSymbolColor, minWaterfallSpeed, maxWaterfallSpeed, symbolShuffleSpeed, }