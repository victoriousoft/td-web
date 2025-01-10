<script lang="ts" module>
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";

	let title = $state("An error has occured");
	let message = $state("An error has occured");
	let isOpen = $state(false);

	export function showError(newTitle: string, newMssage: string) {
		title = newTitle;
		message = newMssage;
		isOpen = true;
	}
</script>

<AlertDialog.Root open={isOpen}>
	<AlertDialog.Content class="z-[500]">
		<AlertDialog.Header>
			<AlertDialog.Title class="text-center text-2xl">{title}</AlertDialog.Title>
			<AlertDialog.Description class="text-center">
				{message}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Action onclick={() => (isOpen = false)}>Close</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
