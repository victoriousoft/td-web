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
</script>

<iframe bind:this={iframe} on:load={onIframeLoad} title="Game window" src="https://td.kristn.co.uk/" class="h-lvh w-full" />
