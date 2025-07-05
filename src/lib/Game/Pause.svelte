<script>
	export let System;

	function close() {
		System.game.pause = false;
		System.pages.change('Game');
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

			<button
				class="big"
				on:click={() => {
					System.pages.change('Settings');
				}}
			>
				Options
			</button>

			<br />

			{#if System.game.mode == 'Entraînement'}
				<button
					class="big"
					on:click={() => {
						System.view.reset();
						System.pages.change('Training');
						System.game = undefined;
					}}
				>
					Configurer l'entraînement
				</button>

				<br />
			{/if}

			<button
				class="big"
				on:click={() => {
					System.view.reset();
					System.pages.change('Menu');
					System.game = undefined;
				}}
			>
				Quitter la partie
			</button>
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
		padding: 1%;
		border: solid;
		border-width: 5px;
		text-align: center;
	}
</style>
