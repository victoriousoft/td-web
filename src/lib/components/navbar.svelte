<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
</script>

{#if $page.data.user}
	<nav>
		<a href="/">Home</a>
		<p>{$page.data.user.name}</p>
		<button on:click={() => signOut()}>Logout</button>
	</nav>
{:else}
	<nav>
		<a href="/">Home</a>
		<button on:click={() => signIn("google")}>Login</button>
	</nav>
{/if}
