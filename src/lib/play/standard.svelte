<script lang="ts">
	import { Game } from "$lib/game/class";
	import View from "../deck/preview.svelte";
	import { several } from "../utils";
	import type { System } from "$lib/system/class";

	export let system: System;

	let array = [];

	for (const deck of system.standard_decks) {
		array.push(deck);
	}
</script>

<div class="taskbar">
	<div>
		<button
			class="square close"
			on:click={() => {
				system.page = "Menu";
			}}
		>
			X
		</button>

		<button
			class="square return"
			on:click={() => {
				system.view.reset();
				system.page = "Play";
			}}
		>
			↩
		</button>
	</div>

	<div>
		<button class="taskbar">Mode Standard</button>
	</div>
</div>

<div class="zone side">
	<div class="zone_taskbar">
		<div>
			{several(array.length, ["Deck"])}
		</div>
	</div>

	<div id="list" class="scroll">
		{#each array as deck}
			<div class="preview">
				<div>
					<button
						on:mouseenter={() => {
							system.view.quick = deck;
						}}
						on:mouseleave={() => {
							system.view.quick = undefined;
						}}
						on:click={() => {
							system.view.card = deck;
						}}
					>
						{deck.name}
					</button>
				</div>

				<div style="text-align:right">
					<button
						on:click={() => {
							system.view.reset();
							system.game = new Game(system, "Standard", deck);
						}}
					>
						Jouer
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<div id="view">
	<View bind:system />
</div>

<style>
	#list {
		max-height: 85vh;
	}

	.preview {
		border-radius: 0;

		background-color: var(--deck_preview);
		background-image: var(--leather);

		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.preview:hover {
		background-color: var(--deck_preview_hover);
	}

	#view {
		position: fixed;
		top: 0;
		left: 54vw;
	}
</style>
