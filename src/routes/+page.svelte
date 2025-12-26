<script lang="ts">
	import { onMount } from 'svelte';
	// config
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
		getRandomNumber,
		firstSymbolColor,
		minWaterfallSpeed,
		maxWaterfallSpeed,
		symbolShuffleSpeed
	} from '$lib/config';
	// types
	import type { Symbol, Chain, Matrix } from '$lib/types';
	// components
	import FPS from '$lib/fps.svelte';
	import Config from '$lib/config.svelte';
	// styles
	import '../app.scss';

	let fpsOpen = false;
	let configModalOpen = false;
	let matrixWidth = 0;
	let matrixHeight = 0;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let pathCache: any = {};
	let matrix: Matrix;

	const getY = () => -Math.random() * matrixHeight; //  * 0.5
	const getSpeed = () => Math.random() / getRandomNumber(minWaterfallSpeed, maxWaterfallSpeed);
	const getChainLength = () => Math.floor(getRandomNumber(minChainSize, maxChainSize));
	const getRondomSymbolIndex = () => Math.floor(Math.random() * symbolsCount);
	const getChain = () => Array.from({ length: getChainLength() }, () => getRondomSymbolIndex());
	const getRondomSymbol = () => symbols[getRondomSymbolIndex()];
	const getNewMatrix = () => ({ chain: getChain(), speed: getSpeed(), y: getY() });
	const getMatrixLength = () => Math.ceil(matrixWidth / symbolSize);

	function init() {
		if (!canvas) return;
		ctx = canvas.getContext('2d');
		matrix = Array.from({ length: getMatrixLength() }, () => getNewMatrix());
		draw();
	}

	const getOrCreatePath = (symbol: Symbol) => {
		if (!pathCache[symbol.d]) {
			pathCache[symbol.d] = new Path2D(symbol.d);
		}
		return pathCache[symbol.d];
	};

	function draw() {
		if (!ctx || !canvas) return;
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, matrixWidth, matrixHeight);

		for (let i = 0; i < matrix.length; i++) {
			let chain: Chain = matrix[i].chain;

			for (let j = 0; j < chain.length; j++) {
				const isFirstSymbol = j === chain.length - 1;
				let symbol: Symbol =
					isFirstSymbol || (!isFirstSymbol && Math.random() * 100 > 100 - j * symbolShuffleSpeed)
						? getRondomSymbol()
						: symbols[chain[j]];

				let path = getOrCreatePath(symbol);

				ctx.save();
				ctx.textRendering = 'optimizeSpeed';
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

	const keyup = (e: KeyboardEvent) => {
		if (e.key === 'F' || e.key === 'f') fpsOpen = !fpsOpen;
		if (e.key === 'C' || e.key === 'c') configModalOpen = !configModalOpen;
		if (e.key === 'R' || e.key === 'r') init();
	};

	onMount(() => {
		init();
	});
</script>

<svelte:window on:keyup={keyup} bind:innerWidth={matrixWidth} bind:innerHeight={matrixHeight} />
{#if fpsOpen}<FPS />{/if}
{#if configModalOpen}<Config />{/if}
<canvas
	bind:this={canvas}
	width={matrixWidth}
	height={matrixHeight}
	style="position: fixed; top: 0; left: 0"
/>
