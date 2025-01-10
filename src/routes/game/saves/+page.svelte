<script lang="ts">
	import { page } from "$app/state";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Card from "$lib/components/ui/card";
	import Codeblock from "$lib/components/codeblock.svelte";
	import type { JsonValue } from "fast-check";
	import { SaveGenerator } from "$lib/save-gen";

	let { data } = $props();

	function htmlPrettyPrint(json: string) {
		return inputPrettyPrint(json).replace(/\n/g, "<br>").replace(/ /g, "&nbsp;");
	}

	function inputPrettyPrint(json: JsonValue) {
		return JSON.stringify(json, null, 4);
	}
</script>

<h1 class="m-5 text-center text-4xl font-bold">Game save slots</h1>

{#if data.saves.length === 0}
	<div class="flex h-96 items-center justify-center">
		<p class="text-center">No saves found.</p>
	</div>
{/if}

<div class="grid grid-cols-1 gap-4 px-5 md:grid-cols-2 lg:grid-cols-3">
	{#each data.saves as save, index}
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between">
				<Card.Title>{save.title}</Card.Title>
				<button onclick={() => alert("impossible")}>
					<span class="material-symbols-outlined -translate-y-1"> edit </span>
				</button>
			</Card.Header>
			<Card.Content>
				<Accordion.Root type="single">
					<Accordion.Item value="Content-{index}">
						<Accordion.Trigger>Content</Accordion.Trigger>
						<Accordion.Content>
							<Codeblock language="json" code={inputPrettyPrint(save.content)} />
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
				<div class="flex justify-end">
					<Button type="submit" variant="destructive" class="my-3" onclick={() => alert("impossible")}>Delete</Button>
				</div>
			</Card.Content>
			<Card.Footer>
				<p class="text-sm text-gray-500">
					Created: {save.createdAt.toLocaleDateString()} <br /> Updated: {SaveGenerator.getRelativeDate(save.updatedAt)}
				</p>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
