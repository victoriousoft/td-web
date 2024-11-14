<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";
	import "../app.css";
	import { page } from "$app/stores";

	onMount(() => {
		console.log($page.form);
		if ($page.form?.message) {
			alert("Error " + $page.form.message);
		}
	});
</script>

<Navbar />
<slot></slot>
