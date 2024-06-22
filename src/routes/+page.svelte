<script lang="ts">
	import { onMount } from 'svelte';
	import { symbolSize, symbolsCount, symbols } from '$lib/config';
	import Chain from '$lib/chain.svelte';
	import '../app.scss';

	let matrixWidth = 0;
	let matrixHeight = 0;
	// let columns: number[] = [];

	// const calculations = () => {
	// 	const gridX = matrixWidth > 0 ? Math.ceil(matrixWidth / (symbolSize * 10)) : 1;
	// 	columns = new Array(gridX).fill(0);
	// }

	// onMount(() => {
	// 	calculations();
	// });

	// const resize = () => {
	// 	calculations();
	// }
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let matrix: any[] = [];

	const getMatrix = () => {
		matrix = Array.from({ length: matrixWidth / 10 }, () =>
			Math.floor(Math.random() * symbolsCount)
		);
	};

	function draw() {
		if (!ctx) return;
		ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#0f0';

		for (let i = 0; i < matrix.length; i++) {
			let symbol = symbols[matrix[i]];
			let path = new Path2D(symbol.d);

			let scale = 0.02;
			ctx.save();
			ctx.translate(i * 10, matrix[i] * 10);
			ctx.scale(scale, scale);
			ctx.fill(path);
			ctx.restore();

			if (matrix[i] * 10 > canvas.height) {
				matrix[i] = 0;
			} else {
				matrix[i]++;
			}
		}

		requestAnimationFrame(draw);
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		getMatrix();
		console.info(matrix);
		draw();
	});
</script>

<svelte:window bind:innerWidth={matrixWidth} bind:innerHeight={matrixHeight} />
<canvas bind:this={canvas} width={matrixWidth} height={matrixHeight}></canvas>

<!-- <div id="matrix">
	{#each columns as _}
		<div class="col" style="--col-width: {symbolSize}rem">
			<Chain {matrixHeight} />
		</div>
	{/each}
</div> -->

<style lang="scss">
	#matrix {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		justify-content: flex-start;
		overflow: hidden;
		background-color: black;

		.col {
			position: relative;
			width: var(--col-width);
			height: 100vh;
			display: flex;
			flex-flow: column wrap;
			align-items: flex-start;
		}
	}
</style>
