<script lang="ts">
	import * as Card from "$lib/components/ui/card";

	let { data } = $props();
</script>

<svelte:head>
	<title>Ratar TD</title>
</svelte:head>

<img src="logo.png" alt="Logo" class="lg:w-1/8 mx-auto mb-5 mt-10 w-1/2 sm:w-1/4 md:w-1/6" />

<h2 class="m-5 mt-10 text-center text-2xl font-bold">Latest updates</h2>
<div class="mx-auto grid max-w-2xl gap-5 p-5">
	{#each data.latestPosts as posts}
		<Card.Root>
			<Card.Header>
				<Card.Title>{posts.title}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>{posts.content}</p>
			</Card.Content>
			<Card.Footer>
				<p class="text-sm text-gray-500">
					Posted at: {posts.createdAt.toLocaleString()}
				</p>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
