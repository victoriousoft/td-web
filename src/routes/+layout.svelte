<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";
	import "../app.css";
	import { page } from "$app/state";
	import Error, { showError } from "$lib/components/error.svelte";
	import Prompt, { showPrompt } from "$lib/components/prompt.svelte";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		if (page.form?.message) {
			showError(page.form.title, page.form.message);
			console.error(page.form.message);
		}
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=edit" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link href="https://fonts.googleapis.com/css2?family=Gideon+Roman&family=Luxurious+Roman&display=swap" rel="stylesheet" />
	<style>
		@font-face {
			font-family: "Seagram TFB";
			src: url("/fonts/seagram-tfb.ttf") format("truetype");
		}
	</style>
</svelte:head>

<Error />
<Prompt />
<Navbar />
<main>
	{@render children?.()}
</main>
