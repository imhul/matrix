export const config = {
    minFallSpeed: 4,
    maxFallSpeed: 8,

    minShuffleSpeed: 0.1,
    maxShuffleSpeed: 2,

    headShuffleSpeed: 10, // ~0.17 секунд при 60 FPS

    symbolSize: 22,
    minChain: 64,
    maxChain: 128,

    bgColor: "#000000",
    mainColor: "#00DB00",
    firstColor: "#ffffff",
    shadowColor: "#299258",
    whiteShadowColor: "#ffffff",

    glowFilterConfig: {
        distance: 8,
        outerStrength: 1,
        color: "#b6ffb6ff",
        quality: 0.5,
    },

    characters:
        // Greek
        "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω" +
        // Katakana
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
}

export function rand(min: number, max: number) {
    return Math.random() * (max - min) + min
}
