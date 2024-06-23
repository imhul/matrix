<script lang="ts">
	import { onMount } from 'svelte';
	import {
		symbols,
		bgColor,
		symbolSize,
		matrixColor,
		shadowColor,
		symbolScale,
		minChainSize,
		maxChainSize,
		symbolsCount,
		getRondomNumner,
		firstSymbolColor,
		minWaterfallSpeed,
		maxWaterfallSpeed,
		symbolShuffleSpeed
	} from '$lib/config';

	import '../app.scss';

	let matrixWidth = 0;
	let matrixHeight = 0;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let matrix: any[] = [];

	const getY = () => -Math.random() * matrixHeight; //  * 0.5
	const getSpeed = () => Math.random() / getRondomNumner(minWaterfallSpeed, maxWaterfallSpeed);
	const getChainLength = () => Math.floor(getRondomNumner(minChainSize, maxChainSize));
	const getRondomSymbolIndex = () => Math.floor(Math.random() * symbolsCount);
	const getChain = () => Array.from({ length: getChainLength() }, () => getRondomSymbolIndex());
	const getRondomSymbol = () => symbols[getRondomSymbolIndex()];
	const getNewMatrix = () => ({ chain: getChain(), speed: getSpeed(), y: getY() });

	function draw() {
		if (!ctx || !canvas) return;
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, matrixWidth, matrixHeight);
		ctx.fillStyle = matrixColor;

		for (let i = 0; i < matrix.length; i++) {
			let chain = matrix[i].chain;

			for (let j = 0; j < chain.length; j++) {
				const isFirstSymbol = j === chain.length - 1;
				let symbol =
					isFirstSymbol || (!isFirstSymbol && Math.random() * 100 > 100 - j * symbolShuffleSpeed)
						? getRondomSymbol()
						: symbols[chain[j]];
				let path = new Path2D(symbol.d);

				ctx.save();
				ctx.translate(i * 10, matrix[i].y + j * (symbolSize + 15));
				ctx.scale(symbolScale, symbolScale);
				ctx.fillStyle = isFirstSymbol ? firstSymbolColor : matrixColor;
				ctx.shadowColor = isFirstSymbol ? firstSymbolColor : shadowColor;
				ctx.shadowBlur = 16;
				ctx.globalAlpha = 0.02 + (1 - 0.2) * (j / (chain.length - 1));
				ctx.fill(path);
				ctx.restore();

				matrix[i].y += matrix[i].speed;
				if (matrix[i].y > canvas.height) matrix[i] = getNewMatrix();
			}
		}

		requestAnimationFrame(draw);
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		matrix = Array.from({ length: Math.ceil(matrixWidth / symbolSize) }, () => getNewMatrix());
		draw();
	});
</script>

<svelte:window bind:innerWidth={matrixWidth} bind:innerHeight={matrixHeight} />
<canvas
	bind:this={canvas}
	width={matrixWidth}
	height={matrixHeight}
	style="position: fixed; top: 0; left: 0"
/>
