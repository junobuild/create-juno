<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { signIn } from '@junobuild/core';

	const signInWithII = async () => {
		await signIn({
			internet_identity: {}
		});
	};
</script>

<Button onclick={signInWithII}>Continue with Internet Identity</Button>
