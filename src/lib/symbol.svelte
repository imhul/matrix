<script lang="ts">
	import { afterUpdate } from 'svelte';
	// config
	import {
		symbols,
		symbolSize,
		matrixColor,
		shadowColor,
		symbolsCount,
		getRondomNumner,
		firstSymbolColor
	} from '$lib/config';

	export let symbol = '';
	export let index = 0;
	export let chainLength = 0;

	const getOpacity = (index: number) => {
		const opacity = (index / chainLength) * 0.85;
		return opacity.toFixed(1);
	};

	afterUpdate(() => {
		const timeout = 100 * index;
		const interval = setInterval(() => {
			symbol = symbols[getRondomNumner(1, symbolsCount)];
		}, timeout);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<i
	class="matrix-{symbol}"
	style="color: {index === chainLength
		? firstSymbolColor
		: matrixColor}; text-shadow: 0 0 1rem {shadowColor}; opacity: {getOpacity(
		index
	)}; font-size: {symbolSize}rem;"
/>
