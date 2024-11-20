<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
	import Button from "./ui/button/button.svelte";
	import Link from "./link.svelte";
</script>

<nav class="flex w-full items-center justify-between border-b p-5">
	<div class="flex items-center [&>*]:mx-2">
		<Link href="/">Home</Link>
		<Link href="/game/saves">Save slots</Link>
		{#if $page.data.user?.isAdmin}
			<Link href="/admin">Admin</Link>
		{/if}
	</div>
	<div class="flex items-center [&>*]:mx-2">
		{#if $page.data.user}
			<p>{$page.data.user.name} {$page.data.user.isAdmin ? "(ADM)" : ""}</p>
			<Button variant="destructive" on:click={() => signOut()}>Logout</Button>
		{:else}
			<Button variant="secondary" on:click={() => signIn("google")}>Login</Button>
		{/if}
		<Button href="/game">Play!</Button>
	</div>
</nav>
