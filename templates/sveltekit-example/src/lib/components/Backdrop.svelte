<script lang="ts">
	interface Props {
		spinner?: boolean;
	}

	let { spinner = false }: Props = $props();
</script>

<div
	class="fixed inset-0 z-40 bg-white/30 dark:bg-lavender-blue-200/40 flex items-center justify-center backdrop-blur-xl"
>
	{#if spinner}
		<div
			class="w-12 h-12 rounded-full animate-spin border-[3px] border-solid border-lavender-blue-600 border-t-transparent"
		></div>
	{/if}
</div>
