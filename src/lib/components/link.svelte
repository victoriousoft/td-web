<script lang="ts">
	interface Props {
		href?: string;
		children?: import("svelte").Snippet;
	}

	let { href = "/", children }: Props = $props();
</script>

<a
	{href}
	class="text-l relative inline-block text-nowrap after:block
         after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gray-900 after:transition-transform
         after:duration-300 after:content-[''] hover:after:scale-x-100 dark:text-blue-300 dark:after:bg-gray-300"
	>{@render children?.()}
</a>
