<script lang="ts">
	import type { System } from "$lib/system/class";
	import { several } from "../utils";
	import { Deck } from "$lib/deck/class";
	import View from "../deck/view.svelte";
	import type { TrainEntity } from "./train";
	import Preview from "$lib/deck/preview.svelte";

	export let system: System;
	export let entity: TrainEntity;

	let deck_list: Deck[] = [];
	deck_list.push(system.train_deck);
	for (const deck of system.standard_decks) {
		deck_list.push(deck);
	}
	for (const deck of system.wild_decks) {
		deck_list.push(deck);
	}
	let side_view: string = "right";

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

		<div class="zone">
			<div class="zone_taskbar">
				<div>
					{several(deck_list.length, ["Deck"])}
				</div>
			</div>

			<div id="list" class="scroll">
				{#each deck_list as deck, index}
					<Preview
						bind:system
						bind:deck
						bind:side_view
						can_deplace={false}
						{index}
						fonction={() => {
							entity.deck = deck;
							system.view.reset();
							system.train.add.reset();
						}}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>

<div id="view" class={side_view}>
	<View bind:system />
</div>

<style>
	#list {
		height: 80vh;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(3, calc(80vh / 3));
		grid-auto-rows: calc(80vh / 3);
		overflow-y: auto;
		scroll-snap-type: y mandatory;
	}

	#view {
		position: fixed;
		top: 0;
	}

	.left {
		left: 0;
	}

	.right {
		left: 54vw;
	}
</style>
