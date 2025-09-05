<script lang="ts">
	import {
		type SignProgress,
		type SignProgressFn,
		signUp,
		WebAuthnSignUpProgressStep
	} from '@junobuild/core';
	import type { PasskeyProps } from '$lib/types/passkey';
	import Button from '$lib/components/Button.svelte';
	import Progress from '$lib/components/passkey/Progress.svelte';

	type ProgressSignUp =
		| { state: 'init' | 'setup' | 'hidden' }
		| { state: 'progress'; detail: SignProgress<WebAuthnSignUpProgressStep> };

	let { progress: wizardProgress, onProgress: wizardOnProgress }: PasskeyProps = $props();

	let inputText = $state('');

	const progress = $derived(
		wizardProgress === undefined
			? { state: 'init' }
			: 'signUp' in wizardProgress
				? { state: 'progress', detail: wizardProgress.signUp }
				: 'setup' in wizardProgress
					? { state: 'setup' }
					: { state: 'hidden' }
	);

	const goToSetup = async () => {
		wizardOnProgress({ setup: null });
	};

	const onProgress: SignProgressFn<WebAuthnSignUpProgressStep> = (progress) =>
		wizardOnProgress({ signUp: progress });

	const doSignUp = async () => {
		try {
			await signUp({
				webauthn: {
					options: {
						onProgress,
						...(inputText !== '' && {
							passkey: { user: { displayName: inputText } }
						})
					}
				}
			});
		} catch (error: unknown) {
			wizardOnProgress(undefined);

			throw error;
		}
	};
</script>

{#if progress.state === 'init'}
	<p>First time here? Use your device (Face ID, Windows Hello, or screen lock) to get in.</p>

	<Button onclick={goToSetup}>Create a new passkey</Button>
{/if}

{#if progress.state === 'setup'}
	<p>Want to give it a nickname so you'll spot it easily later?</p>

	<input
		class="mx-0 mt-2 mb-6 block w-full resize-none rounded-sm border-[3px] border-black bg-white px-3 py-1.5 text-base font-normal shadow-[5px_5px_0px_rgba(0,0,0,1)] focus:outline-hidden"
		placeholder="An optional nickname"
		bind:value={inputText}
	/>

	<Button onclick={doSignUp}>Create now</Button>
{/if}

{#if progress.state === 'progress'}
	<Progress>
		{#if progress.detail.step === WebAuthnSignUpProgressStep.CreatingUserCredential}
			<span>Creating user credential...</span>
		{:else if progress.detail.step === WebAuthnSignUpProgressStep.ValidatingUserCredential}
			<span>Validating user credential...</span>
		{:else if progress.detail.step === WebAuthnSignUpProgressStep.FinalizingCredential}
			<span>Finalizing credential...</span>
		{:else if progress.detail.step === WebAuthnSignUpProgressStep.Signing}
			<span>Signing request...</span>
		{:else if progress.detail.step === WebAuthnSignUpProgressStep.FinalizingSession}
			<span>Finalizing session...</span>
		{:else if progress.detail.step === WebAuthnSignUpProgressStep.RegisteringUser}
			<span>Registering user...</span>
		{/if}
	</Progress>
{/if}
