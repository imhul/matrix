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

	export let index = 0;
	export let chainLength = 0;
	let symbol = '';
	const isFirstSymbol = index === chainLength;

	const getOpacity = (index: number) => {
		const opacity = (index / chainLength) * 0.85;
		return opacity.toFixed(1);
	};

	afterUpdate(() => {
		const timeout = 100 * index;
		const interval = setInterval(() => {
			symbol = symbols[getRondomNumner(1, symbolsCount)];
		}, (isFirstSymbol ? 100 : timeout));

		return () => {
			clearInterval(interval);
		};
	});
</script>

<i
	class="matrix-{symbol}"
	style="color: {isFirstSymbol
		? firstSymbolColor
		: matrixColor}; text-shadow: 0 0 1rem {shadowColor}; opacity: {getOpacity(
		index
	)}; font-size: {symbolSize}rem;"
/>
