<script lang="ts">
	import * as Card from "$lib/components/ui/card";

	let { data } = $props();
</script>

<h1 class="m-5 text-center font-seagram text-6xl">Tower Defense</h1>
<p class="text-center text-gray-500">Coming soon...</p>

<h2 class="m-5 mt-10 text-center text-2xl font-bold">Latest updates</h2>
<div class="flex flex-wrap justify-center">
	{#each data.latestPosts as posts}
		<div class="w-full p-5 sm:w-1/2">
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
		</div>
	{/each}
</div>
