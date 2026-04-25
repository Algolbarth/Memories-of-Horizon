<script lang="ts">
	import type { System } from "../system/class";
	import { several } from "../utils";
	import { Deck } from "../deck/class";
	import View from "../deck/preview.svelte";
	import type { TrainEntity } from "./train";

	export let system: System;
	export let entity: TrainEntity;

	let decks: Deck[] = [];
	decks.push(system.train_deck);
	for (const deck of system.standard_decks) {
		decks.push(deck);
	}
	for (const deck of system.wild_decks) {
		decks.push(deck);
	}

	function close() {
		system.view.reset();
		system.train.add.reset();
		system = system;
	}
</script>

<div class="window">
	<div class="body">
		<div class="taskbar">
			<div>
				<button
					class="square close"
					on:click={() => {
						system.page = "Menu";
						close();
					}}
				>
					X
				</button>

				<button
					class="square return"
					on:click={() => {
						close();
					}}
				>
					↩
				</button>
			</div>

			<div>
				<button class="taskbar">Changer de deck</button>
			</div>
		</div>

		<div class="zone side">
			<div class="zone_taskbar">
				<div>
					{several(decks.length, ["Deck"])}
				</div>
			</div>

			<div id="list" class="scroll">
				{#each decks as deck, i}
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
							{#if entity.deck != deck}
								<button
									on:click={() => {
										entity.deck = deck;
										system.view.reset();
										system.train.add.reset();
									}}
								>
									Changer
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<div id="view">
	<View bind:system />
</div>

<style>
	#list {
		max-height: 80vh;
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
