<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { onAuthStateChange } from '@junobuild/core';
	import { userStore } from '$lib/stores/user.store';
	import { userSignedIn } from '$lib/derived/user.derived';
	import Logout from '$lib/components/Logout.svelte';
	import LoginWithII from '$lib/components/LoginWithII.svelte';
	import Passkey from '$lib/components/passkey/Passkey.svelte';
	import LoginWithGoogle from '$lib/components/LoginWithGoogle.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let unsubscribe: (() => void) | undefined = undefined;

	onMount(() => (unsubscribe = onAuthStateChange((user) => userStore.set(user))));

	const automaticSignOut = () => console.log('Automatically signed out because session expired');

	onDestroy(() => unsubscribe?.());
</script>

<svelte:window onjunoSignOutAuthTimer={automaticSignOut} />

{#if $userSignedIn}
	<div>
		{@render children()}

		<Logout />
	</div>
{:else}
	<div class="gap flex flex-col">
		<LoginWithGoogle />

		<Passkey />

		<LoginWithII />
	</div>
{/if}
