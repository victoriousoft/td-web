<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import type { Enemy } from "@prisma/client";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { schema } from "./schema.js";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import type { ActionResult } from "@sveltejs/kit";
	import { enhance } from "$app/forms";

	let { data } = $props();

	let currentEnemy: Enemy | undefined = $state(undefined);
	let isMenuOpen = $state(false);

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});

	const { form: formData } = form;
</script>

<h2>Defined enemies</h2>
{#each data.enemies as enemy}
	<p>{enemy.name}</p>
	<Button
		onclick={() => {
			currentEnemy = data.enemyMap.get(enemy.id);
			// @ts-ignore
			formData.set(currentEnemy);
			isMenuOpen = true;
		}}>edit</Button
	>
{/each}

<AlertDialog.Root bind:open={isMenuOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Editing {currentEnemy?.name}</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result }: { result: ActionResult }) => {
					if (result.type === "success") {
						isMenuOpen = false;
					}
				};
			}}
			action="?/update"
		>
			<input type="hidden" name="id" bind:value={$formData.id} />
			<Form.Field {form} name="description">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Description</Form.Label>
						<Input {...props} bind:value={$formData.description} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="imageUrl">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>ImageUrl</Form.Label>
						<Input {...props} bind:value={$formData.imageUrl} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="unlockLevel">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Unlock level</Form.Label>
						<Input {...props} type="number" bind:value={$formData.unlockLevel} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="mt-4 flex justify-between">
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit">Edit</AlertDialog.Action>
			</div>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
