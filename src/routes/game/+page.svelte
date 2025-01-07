<script lang="ts">
	import Link from "$lib/components/link.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Footer } from "$lib/components/ui/card";
	import * as Dialog from "$lib/components/ui/dialog";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import { writable } from "svelte/store";

	export let data: PageData;

	let iframe: HTMLIFrameElement;
	let isMenuOpen = writable(true);

	onMount(() => {
		iframe.contentWindow?.postMessage(
			{
				type: "jsToUnity",
				data: {
					action: "loadSave",
					args: {
						json: "dsdsa"
					}
				}
			},
			"*"
		);
	});

	function onIframeLoad() {
		iframe.contentWindow?.addEventListener("message", (event: MessageEvent) => {
			if (event.data === "ready") {
				iframe.contentWindow?.postMessage("getUnityInstance", "*");
			} else if (event.data?.type === "unityInstance") {
				const unityInstance = event.data.unityInstance;
				iframe.contentWindow?.postMessage("setUnityInstance", "*");
				console.log(unityInstance);
			}
		});
	}

	async function loadSave(id: number) {
		let saveContent: Object | null = null;
		if (id !== -1) {
			saveContent = data.savesContentMap.get(id);
		} else {
			const res = await fetch("api/saves", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					title: "New save",
					json: "{}"
				})
			});

			if (!res.ok) {
				// TODO: Show error
				console.error("Failed to create new save");
				return;
			}

			const save = await res.json();

			if (save === null) {
				// TODO: show error
				console.error("Failed to create new save");
				return;
			}

			saveContent = save;
		}

		console.log(saveContent);
		iframe.contentWindow?.postMessage(
			JSON.stringify({
				type: "jsToUnity",
				data: {
					action: "loadSave",
					args: {
						json: JSON.stringify(saveContent)
					}
				}
			}),
			"*"
		);

		$isMenuOpen = false;
	}

	function toggleFullscreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			iframe.requestFullscreen();
		}
	}
</script>

<Dialog.Root open={$isMenuOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-center">Select a save</Dialog.Title>
			<Dialog.Description>
				Chose a save to load. If you don't have any saves, you can create a new one.
				<br />
				You can manage your slots on the <Link href="/game/saves">🔗 saves page</Link>.
			</Dialog.Description>
		</Dialog.Header>

		{#each data.saves as save}
			<div class="flex">
				<p>
					{save.title}
					<br />
					<i class="text-s">updated at: {save.updatedAt.toLocaleString()}</i>
				</p>
				<Button class="ml-auto" on:click={() => loadSave(save.id)}>Load</Button>
			</div>
		{/each}

		{#if data.saves.length >= 5}
			<p class="text-center">Maximum of 5 saves allowed, please delete some to create new ones.</p>
		{:else}
			<div class="flex">
				<p>Create new save</p>
				<Button class="ml-auto" on:click={() => loadSave(-1)}>Create</Button>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<div class="h-lvh w-full">
	<iframe bind:this={iframe} on:load={onIframeLoad} title="Game window" src="https://tower-defense.kristn.co.uk/" class="h-lvh w-full" />
	<button class="fixed bottom-4 right-4 z-10" on:click={toggleFullscreen}>
		<img src="icons/fullscreen.webp" alt="Fullscreen" class="h-8 w-8" />
	</button>
</div>
