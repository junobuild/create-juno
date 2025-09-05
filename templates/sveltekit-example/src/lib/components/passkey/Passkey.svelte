<script lang="ts">
	import { isWebAuthnAvailable } from '@junobuild/core';
	import type { PasskeyProgress } from '$lib/types/passkey';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import CreatePasskey from '$lib/components/passkey/CreatePasskey.svelte';
	import UsePasskey from '$lib/components/passkey/UsePasskey.svelte';
	import Backdrop from '$lib/components/Backdrop.svelte';

	let passkeySupported = $state(true);
	let showModal = $state(false);
	let progress = $state<PasskeyProgress | undefined>(undefined);

	onMount(async () => {
		passkeySupported = await isWebAuthnAvailable();
	});

	const start = async () => {
		progress = undefined;
		showModal = true;
	};

	const close = async () => {
		showModal = false;
		progress = undefined;
	};

	const onProgress = (p: PasskeyProgress | undefined) => {
		progress = p;
	};
</script>

{#if passkeySupported}
	<Button onclick={start}>Continue with Passkey</Button>
{/if}

{#if showModal}
	<div
		class="animate-fade fixed inset-0 z-50 p-16 md:px-24 md:py-44"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modalTitle"
	>
		<div
			class="w-full max-w-md rounded-sm border-[3px] border-black bg-white px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
		>
			{#if progress === undefined || 'setup' in progress}
				<div class="flex items-start justify-between">
					<h2 id="modalTitle" class="text-xl font-bold text-gray-900 sm:text-2xl">Hey 👋</h2>

					<button
						type="button"
						class="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
						aria-label="Close"
						onclick={close}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			{/if}

			<div class="mt-4">
				<CreatePasskey {progress} {onProgress} />
				<UsePasskey {progress} {onProgress} />
			</div>
		</div>
	</div>

	<Backdrop />
{/if}
