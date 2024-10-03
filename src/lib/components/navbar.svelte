<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
</script>

<nav class="flex w-full justify-between">
	<div class="flex">
		<a href="/">Home</a>
		<a href="/about">About</a>
	</div>
	<div class="flex">
		{#if $page.data.user}
			<p>{$page.data.user.name}</p>
			<button on:click={() => signOut()}>Logout</button>
		{:else}
			<button on:click={() => signIn("google")}>Login</button>
		{/if}
		<button>Play!</button>
	</div>
</nav>
