<script>
	export let System;

	function close() {
		System.game.pause = false;
	}
</script>

{#if System.game.pause}
	<div class="window">
		<div id="body" class="center">
			<div style="text-align:right;">
				<button
					class="close"
					on:click={() => {
						close();
					}}
				>
					X
				</button>
			</div>

			<div class="button-list center">
				<button
					class="big"
					on:click={() => {
						System.page = "Settings";
					}}
				>
					Options
				</button>

				{#if System.game.mode == "Entraînement"}
					<button
						class="big"
						on:click={() => {
							System.view.reset();
							System.page = "Training";
							System.game = undefined;
						}}
					>
						Configurer l'entraînement
					</button>
				{/if}

				<button
					class="big"
					on:click={() => {
						System.view.reset();
						System.page = "Menu";
						System.game = undefined;
					}}
				>
					Quitter la partie
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.window {
		background: var(--shadow);
	}

	#body {
		background-color: var(--card);
		width: 20vw;
		height: 40vh;
		padding: 1%;
		border: solid;
		border-width: 5px;
		text-align: center;
	}

	.button-list {
		display: grid;
		width: 80%;
	}
</style>
