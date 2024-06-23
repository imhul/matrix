<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	// config
	import { matrixColor, symbolSize } from '$lib/config';

	let lastCalledTime: number;
	let fps = tweened(0);
	let animationFrameId: number;
	const style = 'z-index: 10;' +
		'position: absolute;' +
		'top: 2rem;' +
		'right: 2rem;' +
        'min-width: 4rem;' +
		'padding: 0.5rem 1rem;' +
		`border: 0.3rem solid ${matrixColor};` +
		`color: ${matrixColor};` +
		`box-shadow: 0 0 2.5rem ${matrixColor};` +
        `font-size: ${symbolSize}rem;`
		'background-color: #000';

	function requestAnimFrame() {
		if (!lastCalledTime) {
			lastCalledTime = performance.now();
			fps.set(0);
		} else {
			const delta = (performance.now() - lastCalledTime) / 1000;
			lastCalledTime = performance.now();
			fps.set(1 / delta);
		}
		animationFrameId = requestAnimationFrame(requestAnimFrame);
	}

	onMount(() => {
		requestAnimFrame();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
	});
</script>

<div {style} class="fps">{Math.round($fps)} fps</div>
