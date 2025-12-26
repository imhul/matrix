<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	// config
	import {
		symbols,
		matrixColor,
		shadowColor,
        symbolsCount,
		getRandomNumber,
		firstSymbolColor,
	} from '$lib/config';

	export let d = '';
	export let index = 0;
	export let chainLength = 0;

	const getOpacity = (index: number) => {
		const opacity = (index / chainLength) * 0.85;
		return opacity.toFixed(1);
	};

	const updateSymbol = () => {
		const symbol = symbols[getRandomNumber(1, symbolsCount)];
		d = symbol.d;
	};

	afterUpdate(() => {
        const timeout = 100 * index;
		const interval = setInterval(() => {
			updateSymbol();
		}, timeout);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 1024 1024"
	style="--opacity: {getOpacity(index)}"
>
	{#if index === chainLength}
		<path fill={firstSymbolColor} {d} />
	{:else}
		<path fill={matrixColor} {d} />
	{/if}
</svg>

<style lang="scss">
	svg {
		opacity: var(--opacity);
	}
</style>
