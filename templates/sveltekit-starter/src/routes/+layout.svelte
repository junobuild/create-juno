<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { initSatellite } from '@junobuild/core';
	import Footer from '$lib/components/Footer.svelte';
	import Background from '$lib/components/Background.svelte';
	import '../app.css';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	onMount(
		async () =>
			await initSatellite({
				workers: {
					auth: true
				}
			})
	);
</script>

<div class="relative isolate min-h-[100dvh]">
	<main class="mx-auto max-w-screen-2xl py-16 px-8 md:px-24 [@media(min-height:800px)]:min-h-[calc(100dvh-128px)]">
		<h1 class="dark:text-white text-5xl md:text-6xl font-extrabold md:pt-16">Welcome to Juno</h1>

		<div class="w-full max-w-2xl mt-8 grid grid-cols-2 gap-8">
			{@render children?.()}
		</div>
	</main>

	<Footer />

	<Background />
</div>
