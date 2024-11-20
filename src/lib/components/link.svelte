<script lang="ts">
	export let href = "/";
</script>

<a
	{href}
	class="relative inline-block font-medium after:block
         after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gray-900 after:transition-transform
         after:duration-300 after:content-[''] hover:after:scale-x-100 dark:text-blue-300 dark:after:bg-gray-300"
	><slot />
</a>
