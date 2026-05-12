<script lang="ts">
	import { Game } from "$lib/game/class";
	import View from "../deck/view.svelte";
	import { several } from "../utils";
	import type { System } from "$lib/system/class";
	import type { Deck } from "$lib/deck/class";
	import Preview from "$lib/deck/preview.svelte";

	export let system: System;

	let deck_list: Deck[] = [];
	for (const deck of system.standard_decks) {
		deck_list.push(deck);
	}
	let side_view: string = "right";
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
					system.view.reset();
					system.game = new Game(system, "Standard", deck);
				}}
			/>
		{/each}
	</div>
</div>

<div id="view" class={side_view}>
	<View bind:system />
</div>

<style>
	div#list {
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
