<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Card from "$lib/components/ui/card";
	import Codeblock from "$lib/components/codeblock.svelte";
	import type { JsonValue } from "fast-check";
	import { SaveGenerator } from "$lib/save-gen";
	import Input from "$lib/components/ui/input/input.svelte";
	import { enhance } from "$app/forms";
	import { showError } from "$lib/components/error.svelte";

	let { data } = $props();

	let currentEditingSaveId = $state(-1);
	let saves = $state(data.saves);

	function inputPrettyPrint(json: JsonValue) {
		return JSON.stringify(json, null, 4);
	}
</script>

<h1 class="m-5 text-center text-4xl font-bold">Game save slots</h1>

{#if saves.length === 0}
	<div class="flex h-96 items-center justify-center">
		<p class="text-center">No saves found.</p>
	</div>
{/if}

<div class="grid grid-cols-1 gap-4 px-5 md:grid-cols-2 lg:grid-cols-3">
	{#each saves as save}
		<Card.Root>
			{#if currentEditingSaveId !== save.id}
				<Card.Header class="flex flex-row items-center justify-between">
					<Card.Title>{save.title}</Card.Title>
					<Button onclick={() => (currentEditingSaveId = save.id)}>Rename</Button>
				</Card.Header>
			{:else}
				<Card.Header>
					<form
						class="flex flex-row items-center justify-between"
						action="?/renameSave"
						method="POST"
						use:enhance={({ cancel, formData }) => {
							if (save.title === formData.get("title")) {
								cancel();
								currentEditingSaveId = -1;
							}

							return async ({ result, update }) => {
								console.log(result);

								if (result.status === 200) {
									saves = saves.map((s) => {
										// @ts-ignore
										if (s.id === save.id) s.title = result.data.save.title;
										return s;
									});
								} else {
									// @ts-ignore
									showError(result.data.title, result.data.message);
								}

								currentEditingSaveId = -1;
							};
						}}
					>
						<input type="hidden" name="id" value={save.id} />
						<div>
							<Input name="title" type="text" value={new String(save.title)} />
						</div>
						<div class="flex flex-row flex-wrap items-center justify-center gap-2">
							<Button variant="outline" onclick={() => (currentEditingSaveId = -1)}>Cancel</Button>
							<Button type="submit">Save</Button>
						</div>
					</form>
				</Card.Header>
			{/if}
			<Card.Content>
				<Accordion.Root type="single">
					<Accordion.Item>
						<Accordion.Trigger>Content</Accordion.Trigger>
						<Accordion.Content>
							<Codeblock language="json" code={inputPrettyPrint(save.content)} />
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
				<form
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.status === 200) saves = saves.filter((s) => s.id !== save.id);
							// @ts-ignore
							else showError(result.data.title, result.data.message);
						};
					}}
					class="flex justify-end"
					action="?/deleteSave"
					method="POST"
				>
					<input type="hidden" name="id" value={save.id} />
					<Button type="submit" aria-required variant="destructive" class="my-3">Delete</Button>
				</form>
			</Card.Content>
			<Card.Footer>
				<p class="text-sm text-gray-500">
					Created: {save.createdAt.toLocaleDateString()} <br /> Updated: {SaveGenerator.getRelativeDate(save.updatedAt)}
				</p>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
