<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
	import Button from "./ui/button/button.svelte";
</script>

<nav class="flex w-full items-center justify-between">
	<div class="flex items-center">
		<a href="/">Home</a>
		<a href="/about">About</a>
		{#if $page.data.user.isAdmin}
			<a href="/admin">Admin</a>
		{/if}
	</div>
	<div class="flex items-center">
		{#if $page.data.user}
			<p>{$page.data.user.name} {$page.data.user.isAdmin ? "(ADM)" : ""}</p>
			<Button variant="destructive" on:click={() => signOut()}>Logout</Button>
		{:else}
			<Button variant="secondary" on:click={() => signIn("google")}>Login</Button>
		{/if}
		<Button>Play!</Button>
	</div>
</nav>
