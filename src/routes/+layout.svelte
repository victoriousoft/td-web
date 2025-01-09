<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";
	import "../app.css";
	import { page } from "$app/state";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		console.log(page.form);
		if (page.form?.message) {
			alert("Error " + page.form.message);
		}
	});
</script>

<Navbar />
<main>
	{@render children?.()}
</main>
