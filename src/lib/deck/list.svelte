<script lang="ts">
	import type { System } from "$lib/system/class";
	import { several } from "../utils";
	import { Deck } from "./class";
	import Preview from "./preview.svelte";
	import View from "./view.svelte";

	export let system: System;
	export let decks: Deck[];
	export let mode: string;

	let side_view: string = "right";
	let can_deplace: boolean = false;
	if (mode == "Libre") {
		can_deplace = true;
	}

	let dragging_index: number | null = null;
	let drag_over_index: number | null = null;

	function newDeck() {
		let deck = new Deck(system, "wild");
		system.wild_decks.push(deck);
		system.deck = deck;
		system.page = "Deck";
	}

	function onDragStart(index: number) {
		if (can_deplace) {
			dragging_index = index;
		}
	}

	function onDragOver(event: DragEvent, index: number) {
		if (can_deplace && dragging_index != null) {
			event.preventDefault();
			drag_over_index = index;
		}
	}

	function onDrop(index: number) {
		if (can_deplace && dragging_index != null && dragging_index != index) {
			const updated = [...decks];
			const [moved] = updated.splice(dragging_index, 1);
			updated.splice(index, 0, moved);
			decks = updated;
		}

		dragging_index = null;
		drag_over_index = null;
	}

	function onDragEnd() {
		dragging_index = null;
		drag_over_index = null;
	}
</script>

<div class="taskbar">
	<div>
		<button
			class="square close"
			on:click={() => {
				system.view.reset();
				system.page = "Menu";
			}}
		>
			X
		</button>

		<button
			class="square return"
			on:click={() => {
				system.view.reset();
				system.page = "Decks";
			}}
		>
			↩
		</button>
	</div>

	<div>
		<button class="taskbar">Decks {mode}</button>
	</div>
</div>

<div class="zone">
	<div class="zone_taskbar">
		<div>
			{several(decks.length, ["Deck"])}
		</div>

		{#if mode == "Libre"}
			<div style="text-align: right;">
				<button
					class="active"
					on:click={() => {
						newDeck();
					}}
				>
					Créer un nouveau deck
				</button>
			</div>
		{/if}
	</div>

	<div id="list" class="scroll">
		{#each decks as deck, index}
			<div role="listitem" draggable={can_deplace} on:dragstart={() => onDragStart(index)} on:dragover={(e) => onDragOver(e, index)} on:drop={() => onDrop(index)} on:dragend={onDragEnd} class:dragging={dragging_index === index} class:drag-over={drag_over_index === index && dragging_index !== index}>
				<Preview
					bind:system
					bind:deck
					bind:side_view
					{index}
					fonction={() => {
						system.deck = deck;
						system.view.reset();
						system.page = "Deck";
					}}
				/>
			</div>
		{/each}
	</div>
</div>

<div id="deck-view" class={side_view}>
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

	div#deck-view {
		position: fixed;
		top: 0;
	}

	div.left {
		left: 0;
	}

	div.right {
		left: 54vw;
	}

	div.dragging {
		opacity: 0.4;
	}

	div.drag-over {
		outline: 2px dashed currentColor;
		outline-offset: -3px;
	}
</style>
