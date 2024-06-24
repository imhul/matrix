const symbols = [
    "one", "two", "three", "four", "five", "six",
    "seven", "eight", "nine", "a", "b", "c", "d",
    "e", "f", "g", "h", "i", "j", "underscore", "l",
    "m", "n", "o", "z", "exclam", "quotedbl", "numbersign",
    "dollar", "percent", "ampersand", "quotesingle",
    "parenleft", "parenright", "asterisk", "plus",
    "comma", "hyphen", "hyphen1", "period", "slash",
    "colon", "semicolon", "semicolon1", "less", "equal",
    "greater", "question", "asciicircum", "backslash",
    "bracketleft", "bracketright", "braceleft",
    "braceright", "bar", "asciitilde", "k", "zero"
];

const symbolsCount = symbols.length;
const matrixColor = '#ADF69C';
const shadowColor = '#068029';
const firstSymbolColor = '#ACFFD7';
const symbolSize = 3; // 1.6
const speed = 18 * 1000;
const minChainSize = 80; // percentage of the screen
const maxChainSize = 120; // percentage of the screen

const getRondomNumner = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export {
    speed,
    symbols,
    symbolSize,
    matrixColor,
    shadowColor,
    minChainSize,
    maxChainSize,
    symbolsCount,
    getRondomNumner,
    firstSymbolColor,
};
