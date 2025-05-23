<script lang="ts">
	import Link from "$lib/components/link.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { onMount } from "svelte";
	import { env } from "$env/dynamic/public";
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { writable } from "svelte/store";
	import { Separator } from "$lib/components/ui/separator";
	import { SaveGenerator, type SaveData } from "$lib/save-gen";
	import { showError } from "$lib/components/error.svelte";
	import { tick } from "svelte";
	import { showAlert } from "$lib/components/alert.svelte";

	let { data } = $props();

	interface UnityMessage {
		action: string;
		args: { [key: string]: any };
	}

	let iframe: HTMLIFrameElement | undefined = $state();
	let isMenuOpen = $state(true);
	let isUnityReady = $state(false);
	let selectedSlotId = $state(-1);
	let lastSelectedSlotId = $state(-1);

	onMount(() => {
		window.addEventListener("message", onIframeMessage);
		window.addEventListener("beforeunload", oneBeforeUnload);

		const savedSlot = localStorage.getItem("lastSelectedSlotId");
		lastSelectedSlotId = savedSlot ? parseInt(savedSlot) : -1;

		return () => {
			window.removeEventListener("message", onIframeMessage);
			window.removeEventListener("beforeunload", oneBeforeUnload);
		};
	});

	async function onIframeMessage(event: MessageEvent) {
		console.log("(external) JS - Message from iframe", event.data);

		// Comment for dev
		if (event.source !== iframe?.contentWindow) return;

		const message = event.data as { type: string; data: UnityMessage };

		if (!message.type || !message.data) console.error("Invalid message from iframe", message);

		switch (message.type) {
			case "unityToJs":
				handleUnityMessage(message.data);
				break;
		}
	}

	function sendMessageToUnity(data: UnityMessage) {
		if (!iframe?.contentWindow) return;

		iframe.contentWindow.postMessage(
			{
				type: "jsToUnity",
				data: data
			},
			"*"
		);
	}

	async function oneBeforeUnload(event: BeforeUnloadEvent) {
		if (!isUnityReady) return;

		event.preventDefault();
		event.returnValue = "";
	}

	async function handleUnityMessage(data: UnityMessage) {
		switch (data.action) {
			case "ready":
				console.log("Unity is ready");
				isUnityReady = true;
				break;

			case "levelPass":
				if (!selectedSlotId) {
					showError("Failed to save", "No save slot selected");
					console.error("Failed to save, no save slot selected", data);
					return;
				}

				const level = data.args.level;
				const stars = data.args.stars;

				const res = await fetch("api/save", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						id: selectedSlotId,
						level: level,
						stars: stars
					})
				});

				if (!res.ok) {
					showError("Failed to save", "Failed to save, the server response was invalid");
					console.error("Failed to save, the server response was invalid", res);
					return;
				}

				break;

			case "setVolume":
				const volume = data.args.volume;
				if (volume < 0 || volume > 100) {
					showError("Invalid volume", "Volume must be between 0 and 1");
					console.error("Invalid volume", volume);
					return;
				}

				localStorage.setItem("volume", volume.toString());
				break;

			default:
				console.error("Unknown action from Unity", data);
				break;
		}
	}

	async function loadSave(id: number) {
		if (!iframe?.contentWindow) return;

		let saveContent: SaveData | null = null;
		if (id !== -1) {
			saveContent = SaveGenerator.parseFromJson(data.savesContentMap.get(id) as Object);
			if (!saveContent) {
				showError("Failed to load save", "Failed to load save, save is corrupted.");
				console.error("Failed to load save, save is corrupted.", data.savesContentMap.get(id));
				return;
			}

			document.body.style.cursor = "wait";

			selectedSlotId = id;
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

			saveContent = save.content as SaveData;
			selectedSlotId = save.id as number;
			localStorage.setItem("lastSelectedSlotId", save.id.toString());
		}

		if (!isUnityReady) {
			await new Promise<void>((resolve) => {
				const cleanup = $effect.root(() => {
					$effect(() => {
						if (isUnityReady) {
							cleanup();
							resolve();
						}
					});
				});
			});
		}

		sendMessageToUnity({
			action: "loadSave",
			args: {
				levels: JSON.stringify(saveContent.levels)
			}
		});
		sendMessageToUnity({
			action: "setVolume",
			args: {
				volume: parseInt(localStorage.getItem("volume") || "50")
			}
		});

		document.body.style.cursor = "default";

		isMenuOpen = false;

		iframe.requestFullscreen();
		await tick();
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

<svelte:head>
	<title>Ratar TD | Game</title>
</svelte:head>

<AlertDialog.Root open={isMenuOpen}>
	<AlertDialog.Content escapeKeydownBehavior="ignore">
		<AlertDialog.Header>
			<AlertDialog.Title class="text-center text-xl">Select a save</AlertDialog.Title>
			<AlertDialog.Description class="text-l">
				Choose a save to load. If you don't have any saves, you can create a new one.
				<br />
				You can manage your slots on the <Link href="/game/saves">🔗 saves page</Link>.
				<br />
				If it's your first time playing, consider reading the <Link href="/game/tutorial">🔗 tutorial</Link>.
			</AlertDialog.Description>
		</AlertDialog.Header>

		{#if data.saves.length > 0}
			<Separator />
		{/if}

		{#if selectedSlotId === -1}
			{#each data.saves as save}
				<div class="flex items-center rounded-md p-2 {save.id === lastSelectedSlotId ? 'bg-primary-700' : ''}">
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
	</AlertDialog.Content>
</AlertDialog.Root>

<div class="h-lvh w-full">
	<iframe bind:this={iframe} title="Game window" src={env.PUBLIC_UNITY_INSTANCE_URL} class="h-lvh w-full"></iframe>
	<button class="fixed bottom-4 right-4 z-10" onclick={toggleFullscreen}>
		<img src="icons/fullscreen.webp" alt="Fullscreen" class="h-8 w-8" />
	</button>
</div>
