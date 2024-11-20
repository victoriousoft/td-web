<script lang="ts">
	import * as Card from "$lib/components/ui/card";

	export let data;
</script>

<h1 class="m-5 text-center text-4xl font-bold">Tower Defense</h1>
<p class="text-center text-gray-500">Coming soon...</p>

<h2 class="m-5 mt-10 text-center text-2xl font-bold">Latest updates</h2>
<div class="flex w-full justify-center">
	{#each data.latestPosts as posts}
		<div class="flex w-1/2 flex-col p-5">
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
