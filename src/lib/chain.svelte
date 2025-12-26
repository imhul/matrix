<script lang="ts">
	// config
	import {
		speed,
		symbols,
		maxDelay,
		symbolsCount,
		minChainSize,
		maxChainSize,
		getRandomNumber,
	} from '$lib/config';
	import Symbol from '$lib/symbol.svelte';
	// styles
	import '../app.scss';

	export let matrixHeight: number;
	const chainLength = getRandomNumber(minChainSize, maxChainSize);
	const chain = new Array(chainLength)
		.fill(null)
		.map(() => symbols[getRandomNumber(1, symbolsCount - 1)]);
</script>

<div class="chain" style="--speed: {speed}ms; --delay: {getRandomNumber(1, maxDelay)}ms;">
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
		animation: var(--speed) linear var(--delay) infinite running waterfall;
	}
</style>
