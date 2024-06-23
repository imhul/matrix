<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	// config
	import { matrixColor, shadowColor, symbolSize } from '$lib/config';

	let lastCalledTime: number;
	let fps = tweened(0);
	let animationFrameId: number;
	const style = 'z-index: 10;' +
		'position: absolute;' +
		'top: 2rem;' +
		'right: 2rem;' +
        'display: flex;' +
        'align-items: center;' +
        'justify-content: center;' +
        'min-width: 14rem;' +
		'padding: 0.5rem 0;' +
		`border: 0.3rem solid ${matrixColor};` +
		`color: ${matrixColor};` +
		`box-shadow: 0 0 3rem ${shadowColor};` +
        `font-size: ${symbolSize}rem;` +
		'background-color: #000000;';

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
