<script lang="ts">
	// config
	import {
		symbols,
		minSpeed,
		maxSpeed,
		symbolSize,
		minChainSize,
		maxChainSize,
		symbolsCount,
		getRondomNumner
	} from '$lib/config';
	import Symbol from '$lib/symbol.svelte';
	// styles
	import '../app.scss';

	export let matrixHeight: number;
	const chainLength = Math.ceil(
		matrixHeight / (symbolSize * 10)
	);
	const speed = getRondomNumner(minSpeed, maxSpeed);
	const chain = new Array(chainLength)
		.fill(null)
		.map(() => symbols[getRondomNumner(1, symbolsCount)]);
</script>

<div class="chain" style="--speed: {Math.floor(speed / 1000)}s">
	{#each chain as _, index}
		<Symbol {index} chainLength={chain.length - 1} />
	{/each}
</div>

<style lang="scss">
	.chain {
		position: absolute;
		top: 0;
		display: flex;
		flex-flow: column wrap;
		align-items: flex-start;
		justify-content: flex-start;
		
		width: 100%;
		animation: var(--speed) linear 0s infinite running waterfall;
	}
</style>
