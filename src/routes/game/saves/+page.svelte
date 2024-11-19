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
	import AccordionContent from "$lib/components/ui/accordion/accordion-content.svelte";

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

<h1>Game saves</h1>

{#if data.saves.length === 0}
	<p>No saves found.</p>
{/if}

{#each data.saves as save}
	<div>
		<h2>{save.title}</h2>
		<Accordion.Root>
			<Accordion.Item value="Content">
				<Accordion.Trigger>Content</Accordion.Trigger>
				<Accordion.Content>
					{@html htmlPrettyPrint(save.content)}
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<p>Last updated: {save.updatedAt.toLocaleString()}</p>
		<p>Created: {save.createdAt.toLocaleString()}</p>
		<Button on:click={() => pushToForm(save)}>Edit</Button>
	</div>
{/each}

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
