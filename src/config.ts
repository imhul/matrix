export let config = {
    minFallSpeed: 0.02,
    maxFallSpeed: 0.1,

    minShuffleSpeed: 0.1,
    maxShuffleSpeed: 1,
    headShuffleSpeed: 10,

    newHeadChance: 0.005,

    symbolSize: 22,
    minChain: 30,
    maxChain: 80,

    bgColor: '#000000',
    mainColor: '#00DB00',
    firstColor: '#ffffff',
    shadowColor: '#299258',
    whiteShadowColor: '#ffffff',
    glowColor: '#b6ffb6ff',

    phrase: [
        "Wake up, Neo...",
        "The Matrix has you...",
        "Follow the white rabbit.",
        "Knock, knock, Neo."
    ],

    characters:
        // empty space
        '      ' +
        // Greek
        'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω' +
        // Katakana
        'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
}

export function updateConfig(newConfig: Partial<typeof config>) {
    config = { ...config, ...newConfig }
}

export const appConfig = {
    background: config.bgColor,
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    antialias: false
}

export const glowFilterConfig = {
    distance: 4,
    outerStrength: 1,
    color: config.glowColor,
    quality: 0.5
}

export function rand(min: number, max: number) {
    return Math.random() * (max - min) + min
}
