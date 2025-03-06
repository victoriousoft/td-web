<script lang="ts">
	let { data } = $props();
	import * as Card from "$lib/components/ui/card";

	function getRezistancePercentage(resistance: number) {
		return resistance * 25;
	}
</script>

<h1 class="m-5 text-center text-4xl font-bold">Enemy wiki</h1>

<div class="m-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each data.enemies as enemy}
		<Card.Root>
			<Card.Header>
				<Card.Title>{enemy.name}</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col gap-2">
					<img src={enemy.imageUrl} alt={enemy.name} class="mb-2 h-40 w-full rounded-md object-cover" />
					<p class="text-sm text-muted-foreground">{enemy.description}</p>
					<div class="mt-2 grid grid-cols-2 gap-2">
						<p><span class="font-semibold">Health:</span> {enemy.health}</p>
						<p><span class="font-semibold">Damage:</span> {enemy.damage}</p>
						<p><span class="font-semibold">Physical Resistance:</span> {getRezistancePercentage(enemy.physicalResistance)}%</p>
						<p><span class="font-semibold">Magical Resistance:</span> {getRezistancePercentage(enemy.magicalResistance)}%</p>
						<p><span class="font-semibold">Player Lives:</span> {"❤️".repeat(enemy.playerLives)}</p>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
