<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { saveSchema } from "./schema.js";
	import { page } from "$app/stores";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	import Button from "$lib/components/ui/button/button.svelte";

	export let data;

	const form = superForm($page.data.form, {
		validators: zodClient(saveSchema)
	});

	const { form: formData, enhance } = form;

	function pushToForm(save: any) {
		console.log(save);
		$formData.id = save.id;
		$formData.title = save.title;
		$formData.content = inputPrettyPrint(save.content);
	}

	function htmlPrettyPrint(json: string) {
		const prettyJson = JSON.stringify(json, null, 4);
		return prettyJson.replace(/\n/g, "<br>").replace(/ /g, "&nbsp;");
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
		<div>
			Content:
			<p>{@html htmlPrettyPrint(save.content)}</p>
		</div>
		<p>Last updated: {save.updatedAt.toLocaleString()}</p>
		<p>Created: {save.createdAt.toLocaleString()}</p>
		<Button on:click={() => pushToForm(save)}>Push to form</Button>
	</div>
{/each}

<form method="POST" use:enhance action="?/updateSave">
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
	<Form.Button>Submit</Form.Button>
</form>
