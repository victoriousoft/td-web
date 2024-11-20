<script lang="ts">
	import Prism from "prismjs";
	import "prismjs/themes/prism.css";
	import "prismjs/components/prism-json.js";
	import { onMount } from "svelte";

	export let language: "json";
	export let code: string;

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<pre class="rounded-md"><code class="language-{language}">{code}</code></pre>
