<script lang="ts">
	import Filter from "../filter/view.svelte";
	import Dropdown from "../utils/dropdown.svelte";
	import View from "../cards/view/main.svelte";
	import { several } from "../utils";
	import type { System } from "$lib/system/class";
	import type { Deck } from "./class";
	import { StandardDeck } from "./standard";

	export let system: System;
	export let deck: Deck;

	let name: string = deck.name;
	let filter_window: boolean = false;
	let sort_types: string[] = ["Personnalisé", "Nom", "Niveau", "Coût"];
	if (!(deck instanceof StandardDeck)) {
		sort_types.splice(0, 1);
	}
	let sort_type: string = sort_types[0];
	let card_list: string[] = [];

	let dragging_index: number | null = null;
	let drag_over_index: number | null = null;

	$: can_deplace = deck.isEditable() && system.filter.isReset() && sort_type == "Personnalisé";

	filterFunction();

	function filterFunction() {
		card_list = system.filter.filterString(deck.cards, sort_type);
	}

	function close() {
		if (deck instanceof StandardDeck) {
			system.page = "StandardDecks";
		} else {
			system.page = "WildDecks";
		}
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
		if (!can_deplace && dragging_index != null && dragging_index != index) {
			const updated = [...deck.cards];
			const [moved] = updated.splice(dragging_index, 1);
			updated.splice(index, 0, moved);
			deck.cards = updated;

			filterFunction();
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
				system.filter.resetSelection();
				system.page = "Menu";
			}}
		>
			X
		</button>

		<button
			class="square return"
			on:click={() => {
				system.view.reset();
				system.filter.resetSelection();
				close();
			}}
		>
			↩
		</button>
	</div>

	<div>
		{#if deck instanceof StandardDeck}
			<button class="taskbar">Deck Standard</button>
		{:else}
			<button class="taskbar">Deck Libre</button>
		{/if}
	</div>
</div>

<div id="head" class="zone side">
	<div>
		{#if deck instanceof StandardDeck}
			{deck.name}
		{:else}
			<input type="text" bind:value={name} />
			{#if name != deck.name}
				<button
					on:click={() => {
						if (deck != undefined && name != undefined) {
							deck.changeName(name, 0);
						}
					}}
				>
					Renommer
				</button>
			{/if}
		{/if}

		<br />

		<button
			on:click={() => {
				if (deck != undefined) {
					system.view.reset();
					system.deck = deck.clone();
					name = system.deck.name;
				}
			}}
		>
			Cloner
		</button>
	</div>

	<div style="text-align:right;">
		{#if !(deck instanceof StandardDeck)}
			<button
				class="delete"
				on:click={() => {
					if (deck != undefined) {
						system.view.reset();
						deck.delete();
						system.page = "WildDecks";
					}
				}}
			>
				Supprimer
			</button>
		{/if}
	</div>
</div>

<div class="zone side">
	<div class="zone_taskbar">
		<div class="display:flex;align-items:center;">
			{#if deck.cards.length == 0}
				0 Carte
			{:else}
				{card_list.length}
				/
				{several(deck.cards.length, ["Carte"])}
				-
				<button
					on:click={() => {
						filter_window = true;
					}}
				>
					Filtrer
				</button>
				- Trier par
				<Dropdown
					array={sort_types}
					selected={sort_type}
					selecting={function (element: string) {
						sort_type = element;
						filterFunction();
					}}
				/>
			{/if}
		</div>

		<div style="text-align:right;">
			{#if deck.isEditable()}
				<button
					class="active"
					on:click={() => {
						system.view.reset();
						system.page = "Add";
					}}
				>
					Modifier les cartes
				</button>
			{/if}
		</div>
	</div>

	<div id="list" class="scroll">
		{#each card_list as card, index}
			<div role="listitem" class="preview" draggable={can_deplace} on:dragstart={() => onDragStart(index)} on:dragover={(e) => onDragOver(e, index)} on:drop={() => onDrop(index)} on:dragend={onDragEnd} class:dragging={dragging_index === index} class:drag-over={drag_over_index === index && dragging_index !== index}>
				<div>
					<button
						on:click={() => {
							system.view.card = system.cards.getByName(card);
						}}
						on:mouseenter={() => {
							system.view.quick = system.cards.getByName(card);
						}}
						on:mouseleave={() => {
							system.view.quick = undefined;
						}}
					>
						{card}
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<div id="view">
	<View bind:system />
</div>

{#if filter_window}
	<Filter bind:system bind:filter_window {filterFunction} only_common={true} />
{/if}

<style>
	#head {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.delete {
		color: red;
	}

	.delete:hover {
		color: gold;
	}

	.zone {
		margin-bottom: 1vw;
	}

	#list {
		height: 70vh;
	}

	.preview {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.preview.dragging {
		opacity: 0.4;
	}

	.preview.drag-over {
		outline: 2px dashed currentColor;
		outline-offset: -3px;
	}

	#view {
		position: fixed;
		top: 0;
		left: 54vw;
	}
</style>
