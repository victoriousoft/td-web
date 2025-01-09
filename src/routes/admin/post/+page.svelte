<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	import { createPostSchema, type CreatePostSchema } from "./schema";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	const form = superForm($page.data.form, {
		validators: zodClient(createPostSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div>
	<h1>Old posts</h1>
	{#if $page.data.posts.length === 0}
		<p>No posts found.</p>
	{/if}
	{#each $page.data.posts as post}
		<p>{post.title}</p>
		<form method="POST" action="?/deletePost">
			<input type="hidden" name="id" value={post.id} />
			<Button variant="destructive" type="submit">Delete</Button>
		</form>
	{/each}
</div>

<h1>New post</h1>
<form method="POST" use:enhance action="?/createPost">
	<Form.Field {form} name="title">
		<Form.Control >
			{#snippet children({ attrs })}
						<Form.Label>Title</Form.Label>
				<Input {...attrs} bind:value={$formData.title} />
								{/snippet}
				</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="content">
		<Form.Control >
			{#snippet children({ attrs })}
						<Form.Label>Content</Form.Label>
				<Textarea {...attrs} bind:value={$formData.content} />
								{/snippet}
				</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
