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

<div>
	<iframe bind:this={iframe} on:load={onIframeLoad} title="Game window" src="https://tower-defense.kristn.co.uk/" class="h-lvh w-full" />
	<button class="fixed bottom-4 right-4 z-10" on:click={toggleFullscreen}>
		<img src="icons/fullscreen.webp" alt="Fullscreen" class="h-8 w-8" />
	</button>
</div>
