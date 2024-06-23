<script lang="ts">
	import { onMount } from 'svelte';
	import { symbolSize } from '$lib/config';
	import Chain from '$lib/chain.svelte';
	import '../app.scss';

	let matrixWidth = 0;
	let matrixHeight = 0;
	let columns: number[] = [];

	const calculations = () => {
		const gridX = matrixWidth > 0 ? Math.ceil(matrixWidth / (symbolSize * 10)) : 1;
		columns = new Array(gridX).fill(0);
	}

	onMount(() => {
		calculations();
	});

	const resize = () => {
		calculations();
	}
</script>

<svelte:window on:resize={resize} bind:innerWidth={matrixWidth} bind:innerHeight={matrixHeight} />

<div id="matrix">
	{#each columns as _}
		<div class="col" style="--col-width: {symbolSize}rem">
			<Chain {matrixHeight} />
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
			position: relative;
			width: var(--col-width);
			height: 100vh;
			display: flex;
			flex-flow: column wrap;
			align-items: flex-start;
		}
	}
</style>

