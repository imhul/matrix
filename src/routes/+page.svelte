<script lang="ts">
	import { onMount } from 'svelte';
	import { chunkWidth, getRondomNumner } from '$lib/config';
	import Chunk from '$lib/chunk.svelte';
	import '../app.scss';

	let grid = 1;
	let matrixWidth = 0;
	let chunks: number[] = [];

	onMount(() => {
		grid = matrixWidth > 0 ? Math.ceil(matrixWidth / (chunkWidth * 10)) : 1;
		chunks = new Array(grid).fill(0);
	});

	$: console.info('grid', grid);
</script>

<svelte:window bind:innerWidth={matrixWidth} />

<div id="matrix">
	{#each chunks as chunk, index}
		<div class="col" style="--col-width: {chunkWidth}rem">
			<Chunk {index} />
		</div>
	{/each}
</div>

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
			width: var(--col-width);
			height: 100vh;
		}
	}
</style>
