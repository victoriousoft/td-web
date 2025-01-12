<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";
	import "../app.css";
	import { page } from "$app/state";
	import Error, { showError } from "$lib/components/error.svelte";
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
</svelte:head>

<Error />
<Navbar />
<main>
	{@render children?.()}
</main>
