<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
	import Button from "./ui/button/button.svelte";
	import Link from "./link.svelte";
	import * as Sheet from "$lib/components/ui/sheet";
</script>

<nav class="flex w-full items-center justify-between border-b p-5">
	<div class="hidden items-center gap-4 md:flex">
		<Link href="/">Home</Link>
		<Link href="/game/saves">Save slots</Link>
		{#if $page.data.user?.isAdmin}
			<Link href="/admin">Admin</Link>
		{/if}
	</div>

	<Sheet.Root>
		<Sheet.Trigger class="text-3xl md:hidden">☰</Sheet.Trigger>
		<Sheet.Content side={"left"}>
			<Sheet.Header>
				<Sheet.Title class="text-center">Tower Defense</Sheet.Title>
				{#if $page.data.user}
					<p class="text-center text-sm">{$page.data.user.name} {$page.data.user.isAdmin ? "(ADM)" : ""}</p>
				{/if}
			</Sheet.Header>
			<Sheet.Close>
				<div class="mt-3 flex flex-col items-start gap-2">
					<Link href="/">Home</Link>
					<Link href="/game/saves">Save slots</Link>
					{#if $page.data.user?.isAdmin}
						<Link href="/admin">Admin</Link>
					{/if}
				</div>
			</Sheet.Close>
		</Sheet.Content>
	</Sheet.Root>

	<div class="flex items-center gap-4">
		{#if $page.data.user}
			<p class="hidden md:block">{$page.data.user.name} {$page.data.user.isAdmin ? "(ADM)" : ""}</p>
			<Button variant="destructive" onclick={() => signOut()}>Logout</Button>
			<Button href="/game">Play!</Button>
		{:else}
			<Button variant="secondary" onclick={() => signIn("google")}>Login</Button>
			<Button onclick={() => alert("not yet...")}>Play!</Button>
		{/if}
	</div>
</nav>
