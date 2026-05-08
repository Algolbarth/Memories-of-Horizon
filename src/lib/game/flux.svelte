<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Game } from "./class";

	export let system: System;
	export let game: Game;
	export let show_flux: boolean;

	function close() {
		show_flux = false;
	}

	let number_selected: string = "1";
	let numbers: string[] = ["1", "5", "10", "100", "Max"];
	let elements: string[] = ["Feu", "Air", "Nature", "Eau", "Terre", "Mort", "Arcane", "Foudre", "Lumière", "Metal", "Glace", "Ombre"];
</script>

<div class="window">
	<div id="body" class="center">
		<div class="options">
			<div class="number">
				{#each numbers as number}
					<button
						class={"number" + (number_selected == number ? " selected" : "")}
						on:click={() => {
							number_selected = number;
						}}
					>
						{number}
					</button>
				{/each}
			</div>

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
		</div>

		<br />

		<div class="container">
			{#each elements as element}
				<div class="ressource">
					<button
						style={"background-color:" + system.ressources.find(element).color + ";color:" + (system.ressources.find(element).light_font ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")}
						class="big flux"
						on:click={() => {
							let add: number;

							if (number_selected == "Max") {
								add = game.player.ressource("Flux").total();
							} else {
								add = parseInt(number_selected);
								if (add > game.player.ressource("Flux").total()) {
									add = game.player.ressource("Flux").total();
								}
							}

							game.player.ressource(element).produce(add);
							game.player.ressource(element).increase(add);
							game.player.ressource("Flux").spend(add);

							if (game.player.ressource("Flux").total() == 0) {
								show_flux = false;
							}
						}}
					>
						{element}
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.window {
		background: var(--shadow);
	}

	#body {
		background-color: var(--dropdown);
		background-image: var(--rock);

		width: 50%;
		min-height: max-content;
		max-height: 60vh;
		padding: 1vw;

		border: solid;
		border-width: 0.5vmin;
	}

	div.options {
		display: grid;
		grid-template-columns: 2fr 1fr;
	}

	div.number {
		display: flex;
		place-items: center;
	}

	button.number {
		background-color: var(--zone);
		background-image: var(--asfalt);

		margin-right: 1em;
		padding: 0.3em;
		width: 3em;

		text-align: center;

		border: solid;
	}

	button.number:hover {
		color: black;
	}

	button.selected {
		background-color: rgb(255, 217, 0);
		background-image: var(--metal);
	}

	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.ressource {
		text-align: center;
	}

	button.flux {
		height: 10vh;
		width: 80%;

		border-color: black;

		background-image: var(--metal);
	}

	button.flux:hover {
		border-color: gold;
	}
</style>
