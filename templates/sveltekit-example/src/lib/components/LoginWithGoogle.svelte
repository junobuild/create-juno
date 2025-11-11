<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Backdrop from '$lib/components/Backdrop.svelte';

	let showModal = $state(false);

	const start = async () => {
		showModal = true;
	};

	const close = async () => {
		showModal = false;
	};
</script>

<Button onclick={start}>Continue with Google</Button>

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

			<div class="mt-4">
				<p class="pb-4">You can sign in with Google... but it requires a little setup 😉</p>

				<p class="pb-1">
					Check out the
					<a
						href="https://juno.build/docs/build/authentication/google"
						rel="noopener noreferrer"
						target="_blank"
						class="hover:text-lavender-blue-500 active:text-lavender-blue-400 inline-flex items-center gap-1 underline"
					>
						Juno authentication docs
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="16px"
							viewBox="0 -960 960 960"
							width="16px"
							fill="currentColor"
						>
							<path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
						</svg>
					</a>
				</p>
			</div>
		</div>
	</div>

	<Backdrop />
{/if}
