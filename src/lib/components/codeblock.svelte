<script lang="ts">
	import Prism from "prismjs";
	import "prismjs/themes/prism.css";
	import "prismjs/components/prism-json.js";
	import { onMount } from "svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

	interface Props {
		language: "json";
		code: string;
	}

	let { language, code }: Props = $props();

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<ScrollArea class="h-[300px] rounded-md border p-4" orientation="both">
	<pre class="rounded-md"><code class="language-{language}">{code}</code></pre>
</ScrollArea>
