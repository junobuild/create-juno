<script lang="ts">
	import {
		signIn,
		type SignProgress,
		type SignProgressFn,
		WebAuthnSignInProgressStep
	} from '@junobuild/core';
	import type { PasskeyProps } from '$lib/types/passkey';
	import Button from '$lib/components/Button.svelte';
	import Progress from '$lib/components/passkey/Progress.svelte';

	let { progress: wizardProgress, onProgress: wizardOnProgress }: PasskeyProps = $props();

	const progress = $derived<SignProgress<WebAuthnSignInProgressStep> | undefined | null>(
		wizardProgress === undefined
			? undefined
			: 'signIn' in wizardProgress
				? wizardProgress.signIn
				: null
	);

	const onProgress: SignProgressFn<WebAuthnSignInProgressStep> = (p) => {
		wizardOnProgress({ signIn: p });
	};

	const doSignIn = async () => {
		try {
			await signIn({
				webauthn: { options: { onProgress } }
			});
		} catch (error: unknown) {
			wizardOnProgress(undefined);

			throw error;
		}
	};
</script>

{#if progress === undefined}
	<p class="pt-6">Already got one set-up?</p>

	<Button onclick={doSignIn}>Use your passkey</Button>
{:else if progress !== null}
	<Progress>
		{#if progress.step === WebAuthnSignInProgressStep.RequestingUserCredential}
			<span>Requesting user credential...</span>
		{:else if progress.step === WebAuthnSignInProgressStep.FinalizingCredential}
			<span>Finalizing credential...</span>
		{:else if progress.step === WebAuthnSignInProgressStep.Signing}
			<span>Signing request...</span>
		{:else if progress.step === WebAuthnSignInProgressStep.FinalizingSession}
			<span>Finalizing session...</span>
		{:else if progress.step === WebAuthnSignInProgressStep.RetrievingUser}
			<span>Loading user...</span>
		{/if}
	</Progress>
{/if}
