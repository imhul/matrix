<script lang="ts">
	import { onMount } from 'svelte';
	import { symbolsCount, shadowColor, matrixColor, symbols } from '$lib/config';

	import '../app.scss';

	let matrixWidth = 0;
	let matrixHeight = 0;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let matrix: any[] = [];

	const updateMatrixSymbols = () => {
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				matrix[i][j].symbol = Math.floor(Math.random() * symbolsCount);
			}
		}
	};

	const getMatrix = () => {
		matrix = Array.from({ length: matrixWidth / 10 }, () =>
			Array.from(
				{
					length: Math.floor(Math.random() * (matrixHeight / 17 - 50))
				},
				() => ({
					symbol: Math.floor(Math.random() * symbolsCount),
					speed: Math.random() * 2 + 1,
					y: -Math.random() * matrixHeight
				})
			)
		);
		console.info(matrix);
	};

	function draw() {
		if (!ctx || !canvas) return;
		ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = matrixColor;

		for (let i = 0; i < matrix.length; i++) {
			updateMatrixSymbols();

			for (let j = 0; j < matrix[i].length; j++) {
				let symbol = symbols[matrix[i][j].symbol];
				let path = new Path2D(symbol.d);

				let scale = 0.02;
				ctx.save();
				ctx.translate(i * 10, matrix[i][j].y);
				ctx.scale(scale, scale);
				ctx.fill(path);
				ctx.restore();

				matrix[i][j].y += matrix[i][j].speed;

				if (matrix[i][j].y > canvas.height) {
					matrix[i][j] = {
						symbol: Math.floor(Math.random() * symbolsCount),
						speed: Math.random() * 2 + 1,
						y: -Math.random() * matrixHeight
					};
				}
			}
		}

		requestAnimationFrame(draw);
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		getMatrix();
		// console.info(matrix);
		draw();
	});
</script>

<svelte:window bind:innerWidth={matrixWidth} bind:innerHeight={matrixHeight} />
<canvas bind:this={canvas} width={matrixWidth} height={matrixHeight} />

<style lang="scss">
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000;
	}
</style>
