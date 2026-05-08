<script lang="ts">
	import type { System } from "$lib/system/class";
	import { Game } from "./class";

	export let system: System;
	export let game: Game;

	function close() {
		game.pause = false;
	}
</script>

<div class="window">
	<div id="body" class="center">
		<div style="text-align:right;">
			<button
				class="square close"
				on:click={() => {
					close();
				}}
			>
				X
			</button>
		</div>

		<div class="button-list">
			<button
				class="big"
				on:click={() => {
					system.page = "Settings";
				}}
			>
				Options
			</button>

			{#if game.mode == "Entraînement"}
				<button
					class="big"
					on:click={() => {
						system.view.reset();
						system.page = "Training";
						system.game.stopAuto();
						system.game = undefined;
					}}
				>
					Configurer l'entraînement
				</button>

				<button
					class="big"
					on:click={() => {
						system.view.reset();
						system.game.stopAuto();
						game = new Game(system, "Entraînement");
					}}
				>
					Relancer l'entraînement
				</button>
			{/if}

			<button
				class="big"
				on:click={() => {
					system.view.reset();
					system.page = "Menu";
					system.game.stopAuto();
					system.game = undefined;
				}}
			>
				Quitter la partie
			</button>
		</div>
	</div>
</div>

<style>
	div.window {
		background: var(--shadow);
	}

	#body {
		background-color: var(--zone);
		background-image: var(--asfalt);

		width: 20vw;
		height: 50vh;
		padding: 0.75em;

		border: solid;
		border-width: 0.5vmin;

		text-align: center;
	}

	div.button-list {
		display: grid;

		width: 100%;
		padding-top: 1em;
	}
</style>
