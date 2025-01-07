<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { saveSchema } from "./schema.js";
	import { page } from "$app/stores";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Dialog from "$lib/components/ui/dialog";
	import { writable } from "svelte/store";
	import * as Card from "$lib/components/ui/card";
	import Codeblock from "$lib/components/codeblock.svelte";

	export let data;

	const form = superForm($page.data.form, {
		validators: zodClient(saveSchema)
	});

	const { form: formData, enhance, errors } = form;
	const dialogOpen = writable(false);

	function pushToForm(save: any) {
		$formData.id = save.id;
		$formData.title = save.title;
		$formData.content = inputPrettyPrint(save.content);
		dialogOpen.set(true);
	}

	function htmlPrettyPrint(json: string) {
		return inputPrettyPrint(json).replace(/\n/g, "<br>").replace(/ /g, "&nbsp;");
	}

	function inputPrettyPrint(json: string) {
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
			<Card.Header>
				<Card.Title>{save.title}</Card.Title>
			</Card.Header>
			<Card.Content>
				<Accordion.Root>
					<Accordion.Item value="Content-{index}">
						<Accordion.Trigger>Content</Accordion.Trigger>
						<Accordion.Content>
							<Codeblock language="json" code={inputPrettyPrint(save.content)} />
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
				<div class="flex justify-between">
					<Button class="my-3" on:click={() => pushToForm(save)}>Edit</Button>

					<Button type="submit" variant="destructive" class="my-3" on:click={() => alert("impossible")}>Delete</Button>
				</div>
			</Card.Content>
			<Card.Footer>
				<p class="text-sm text-gray-500">
					Created: {save.createdAt.toLocaleString()} <br /> Updated: {save.updatedAt.toLocaleString()}
				</p>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>

<Dialog.Root bind:open={$dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Save</Dialog.Title>
			<Dialog.Description>Edit the details of your save.</Dialog.Description>
		</Dialog.Header>
		<form
			method="POST"
			use:enhance
			action="?/updateSave"
			on:submit={() => {
				dialogOpen.set(false);
			}}
		>
			<Form.Field {form} name="id">
				<Form.Control let:attrs>
					<Input type="hidden" {...attrs} bind:value={$formData.id} />
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Title</Form.Label>
					<Input {...attrs} bind:value={$formData.title} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="content">
				<Form.Control let:attrs>
					<Form.Label>Content</Form.Label>
					<Textarea {...attrs} bind:value={$formData.content} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Update</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
