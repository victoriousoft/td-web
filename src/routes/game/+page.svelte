<script lang="ts">
	import Link from "$lib/components/link.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Dialog from "$lib/components/ui/dialog";
	import { onMount } from "svelte";
	import { env } from "$env/dynamic/public";
	import type { PageData } from "./$types";
	import { writable } from "svelte/store";
	import { Separator } from "$lib/components/ui/separator";
	import { SaveGenerator } from "$lib/save-gen";
	import { showError } from "$lib/components/error.svelte";

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	interface UnityMessage {
		action: string;
		args: { [key: string]: any };
	}

	let iframe: HTMLIFrameElement | undefined = $state();
	const isMenuOpen = writable(true);
	const isUnityReady = writable(false);
	const selectedSlotId = writable(-1);
	const lastSelectedSlotId = writable(-1);

	onMount(() => {
		$lastSelectedSlotId = localStorage.getItem("lastSelectedSlotId") ? parseInt(localStorage.getItem("lastSelectedSlotId") as string) : -1;
	});

	async function onIframeMessage(event: MessageEvent) {
		console.log("(external) JS - Message from iframe", event.data);
		if (event.source !== iframe?.contentWindow) return;

		const message = event.data as { type: string; data: UnityMessage };

		if (!message.type || !message.data) console.error("Invalid message from iframe", message);

		switch (message.type) {
			case "unityToJs":
				handleUnityMessage(message.data);
				break;
		}
	}

	onMount(() => {
		window.addEventListener("message", onIframeMessage);
	});

	async function handleUnityMessage(data: UnityMessage) {
		switch (data.action) {
			case "ready":
				console.log("Unity is ready");
				isUnityReady.set(true);
				break;
		}
	}

	async function loadSave(id: number) {
		if (!iframe?.contentWindow) return;

		let saveContent: Object | null = null;
		if (id !== -1) {
			saveContent = SaveGenerator.parseFromJson(data.savesContentMap.get(id) as Object);
			if (!saveContent) {
				showError("Failed to load save", "Failed to load save, save is corrupted.");
				console.error("Failed to load save, save is corrupted.", data.savesContentMap.get(id));
				return;
			}

			document.body.style.cursor = "wait";

			$selectedSlotId = id;
			localStorage.setItem("lastSelectedSlotId", id.toString());
		} else {
			document.body.style.cursor = "wait";

			const res = await fetch("api/save", { method: "POST" });

			if (!res.ok) {
				showError("Failed to create new save", "Failed to create new save, the server response was invalid");
				console.error("Failed to create new save");
				return;
			}

			const save = await res.json();

			if (save === null) {
				showError("Failed to create new save", "Failed to create new save, the server response was invalid");
				console.error("Failed to create new save");
				return;
			}

			saveContent = save.content;
			$selectedSlotId = save.id;
			localStorage.setItem("lastSelectedSlotId", save.id.toString());
		}

		await new Promise<void>((resolve) => {
			if ($isUnityReady) {
				resolve();
				return;
			}
			const unsubscribe = isUnityReady.subscribe((ready) => {
				if (ready) {
					unsubscribe();
					resolve();
				}
			});
		});

		iframe.contentWindow?.postMessage(
			{
				type: "jsToUnity",
				data: {
					action: "loadSave",
					args: {
						json: JSON.stringify(saveContent)
					}
				}
			},
			"*"
		);

		document.body.style.cursor = "default";

		$isMenuOpen = false;
	}

	function toggleFullscreen() {
		if (!iframe) return;

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
			<Dialog.Title class="text-center text-xl">Select a save</Dialog.Title>
			<Dialog.Description class="text-l">
				Chose a save to load. If you don't have any saves, you can create a new one.
				<br />
				You can manage your slots on the <Link href="/game/saves">🔗 saves page</Link>.
			</Dialog.Description>
		</Dialog.Header>

		<Separator />

		{#if $selectedSlotId === -1}
			{#each data.saves as save}
				<div class="flex items-center rounded-md p-2 {save.id === $lastSelectedSlotId ? 'bg-gray-200' : ''}">
					<p>
						{save.title}
						<br />
						<i class="text-s">Updated {SaveGenerator.getRelativeDate(save.updatedAt)}</i>
					</p>
					<Button class="ml-auto" onclick={() => loadSave(save.id)}>Load</Button>
				</div>
			{/each}

			<Separator />
			{#if data.saves.length >= 5}
				<p class="text-center">Maximum of 5 saves allowed, please delete some to create new ones.</p>
			{:else}
				<div class="flex">
					<p>Create new save</p>
					<Button class="ml-auto" onclick={() => loadSave(-1)}>Create</Button>
				</div>
			{/if}
		{:else}
			<p class="text-center text-xl">Save selected, game loading...</p>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<div class="h-lvh w-full">
	<iframe bind:this={iframe} title="Game window" src={env.PUBLIC_UNITY_INSTANCE_URL} class="h-lvh w-full"></iframe>
	<button class="fixed bottom-4 right-4 z-10" onclick={toggleFullscreen}>
		<img src="icons/fullscreen.webp" alt="Fullscreen" class="h-8 w-8" />
	</button>
</div>
