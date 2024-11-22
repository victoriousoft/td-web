<script lang="ts">
	let iframe: HTMLIFrameElement;

	function onIframeLoad() {
		const iframeWindow = iframe.contentWindow as any;
		iframeWindow.addEventListener("message", (event: MessageEvent) => {
			if (event.data === "ready") {
				iframeWindow.postMessage("getUnityInstance", "*");
			} else if (event.data?.type === "unityInstance") {
				const unityInstance = event.data.unityInstance;
				iframeWindow.postMessage("setUnityInstance", "*");
				console.log(unityInstance);
			}
		});
	}

	function toggleFullscreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			iframe.requestFullscreen();
		}
	}
</script>

<div class="hidden h-lvh w-full md:block">
	<iframe bind:this={iframe} on:load={onIframeLoad} title="Game window" src="https://tower-defense.kristn.co.uk/" class="h-lvh w-full" />
	<button class="fixed bottom-4 right-4 z-10" on:click={toggleFullscreen}>
		<img src="icons/fullscreen.webp" alt="Fullscreen" class="h-8 w-8" />
	</button>
</div>

<div class="h-lvh w-full md:hidden">
	<p class="mt-20 p-4 text-center text-gray-500">Screen size too small, your screen must be at least 768 pixels wide.</p>
</div>
