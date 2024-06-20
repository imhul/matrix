<script lang="ts">
	import { symbols, matrixColor, minSpeed, maxSpeed, getRondomNumner } from '$lib/config';
	import '../app.scss';

	export let index: number;
	const speed = getRondomNumner(minSpeed, maxSpeed);
</script>

<div class="chunk">
	{#each symbols as symbol}
		<!-- <span>Chunk {index}</span> -->

		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
			<g filter="url(#gaussianBlur)">
				<path d={symbol.d} fill={matrixColor}></path>
			</g>
			<defs>
				<!-- <filter id="gaussianBlur" color-interpolation-filters="sRGB">
                    <feGaussianBlur stdDeviation="749" />
                  </filter> -->
			</defs>
		</svg>
	{/each}
</div>

<style lang="scss">
	.chunk {
		width: 100%;
	}
</style>
