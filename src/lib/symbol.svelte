<script lang="ts">
	import { onMount } from 'svelte';
	// config
	import {
		symbols,
		symbolSize,
		matrixColor,
		shadowColor,
		symbolsCount,
		getRandomNumber,
		firstSymbolColor
	} from '$lib/config';

	export let index = 0;
	export let chainLength = 0;

	const isFirstSymbol = index === chainLength;
	const interval = ((chainLength - index) * 1000) / chainLength;
	const timeout = interval > 2000 ? 2000 : interval;
	const textColor = isFirstSymbol ? firstSymbolColor : matrixColor;
	let symbol = '';

	const getOpacity = (index: number) => {
		const opacity = (index / chainLength) * 0.85;
		return opacity.toFixed(1);
	};

	const update = () => {
		const animate = () => {
			symbol = symbols[getRandomNumber(1, symbolsCount)];
			if (isFirstSymbol) {
				requestAnimationFrame(animate);
			} else {
				setTimeout(() => {
					requestAnimationFrame(animate);
				}, timeout);
			}
		};
		animate();
	};

	onMount(() => {
		update();
	});
</script>

<i
	class="matrix-{symbol}"
	style="color: {
		textColor}; text-shadow: 0.5rem 0 1rem {
		shadowColor}, 0 0 2rem {
		shadowColor}, 0 0.5rem 1rem {
		shadowColor}, -0.5rem 0 1rem {
		shadowColor}, 0 -0.5rem 1rem {
		shadowColor}; opacity: {getOpacity(
		index
	)}; font-size: {symbolSize}rem;"
/>
