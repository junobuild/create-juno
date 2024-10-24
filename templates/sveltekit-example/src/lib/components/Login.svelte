<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { signIn } from '@junobuild/core-peer';

	const login = async () => {
		await signIn();
	};
</script>

<Button onclick={login}>Sign in</Button>
