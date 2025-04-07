<script lang="ts">
	import * as Card from "$lib/components/ui/card";

	let { data } = $props();

	function getRezistancePercentage(resistance: number) {
		return resistance * 25;
	}
</script>

<svelte:head>
	<title>Ratar TD | Wiki</title>
</svelte:head>

<h1 class="m-5 text-center text-4xl font-bold">Wiki</h1>

<h2 class="m-5 text-2xl font-semibold">Enemies</h2>

<div class="m-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
	{#each data.enemies as enemy}
		{#if enemy.unlockLevel <= data.highestUnlockedLevel}
			<Card.Root>
				<Card.Header>
					<Card.Title>{enemy.name}</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-col gap-2">
						<div class="mb-2 flex h-40 items-center justify-center">
							<img src={enemy.imageUrl} alt={enemy.name} class="max-h-40 max-w-full rounded-md object-contain" />
						</div>
						<p class="text-sm text-muted-foreground">{enemy.description}</p>
						<div class="mt-2 grid grid-cols-2 gap-2">
							<p><span class="font-semibold">Health:</span> {enemy.health}</p>
							<p><span class="font-semibold">Damage:</span> {enemy.damage}</p>
							<p><span class="font-semibold">Physical Resistance:</span> {getRezistancePercentage(enemy.physicalResistance)}%</p>
							<p><span class="font-semibold">Magical Resistance:</span> {getRezistancePercentage(enemy.magicalResistance)}%</p>
							<p><span class="font-semibold">Player Lives:</span> {"❤️".repeat(enemy.playerLives)}</p>
							<p><span class="font-semibold">Unlocked at level</span> {enemy.unlockLevel + 1}</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		{:else}
			<Card.Root class="opacity-75">
				<Card.Header>
					<Card.Title>??? Unknown Enemy</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-col gap-2">
						<div class="mb-2 flex h-40 items-center justify-center">
							<div class="flex h-full w-full items-center justify-center rounded-md bg-muted">
								<span class="text-4xl">?</span>
							</div>
						</div>
						<p class="text-sm text-muted-foreground">This enemy is still unknown to you.</p>
						<div class="mt-2">
							<p class="font-semibold text-red-500">Unlocked after completing level {enemy.unlockLevel + 1}</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		{/if}
	{/each}
</div>
