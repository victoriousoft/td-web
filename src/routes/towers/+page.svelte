<script lang="ts">
	import GlbView from "$lib/components/glb-view.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	let { data } = $props();

	let currentTowerKey: null | string = $state(null);
</script>

<div class="flex flex-col items-center justify-between">
	<h1 class="m-5 text-center text-4xl font-bold">Tower preview</h1>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button>Select Tower</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				{#each Object.keys(data.towers) as tower}
					<DropdownMenu.Item onclick={() => (currentTowerKey = tower)}>{tower}</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	{#if currentTowerKey !== null}
		<p class="my-1">Previewing {currentTowerKey}</p>
	{/if}
</div>

{#if currentTowerKey !== null}
	<div class="h-[70vh] w-full">
		<GlbView modelUrl="https://s3.minio.kristn.co.uk/ratartd-models/{data.towers[currentTowerKey]}" />
	</div>
{/if}
