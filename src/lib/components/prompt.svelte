<script lang="ts" module>
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import Button from "./ui/button/button.svelte";

	let okHandler = $state<() => void>();
	let cancelHandler = $state<() => void>();
	let title = $state("An error has occured");
	let message = $state("An error has occured");
	let isOpen = $state(false);

	export function showPrompt(newTitle: string, newMessage: string): Promise<boolean> {
		return new Promise((resolve) => {
			title = newTitle;
			message = newMessage;
			isOpen = true;

			const handleOk = () => {
				isOpen = false;
				resolve(true);
			};

			const handleCancel = () => {
				isOpen = false;
				resolve(false);
			};

			okHandler = handleOk;
			cancelHandler = handleCancel;
		});
	}
</script>

<AlertDialog.Root open={isOpen}>
	<AlertDialog.Content escapeKeydownBehavior="ignore">
		<AlertDialog.Header>
			<AlertDialog.Title class="text-center text-2xl">{title}</AlertDialog.Title>
			<AlertDialog.Description class="text-center">
				{message}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button variant="outline" onclick={cancelHandler}>Cancel</Button>
			<AlertDialog.Action onclick={okHandler}>OK</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
