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
	let sort_type: string = "Personnalisé";
	let sort_types: string[] = ["Personnalisé", "Nom", "Niveau"];
	if (deck instanceof StandardDeck) {
		sort_type = "Nom";
		sort_types = ["Nom", "Niveau"];
	}
	let card_list: string[] = [];

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
		{#each card_list as card, i}
			<div class="preview">
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

				<div style="text-align:right;">
					{#if deck.isEditable() && system.filter.isReset() && sort_type == "Personnalisé"}
						{#if i > 0}
							<button
								class="active"
								on:click={() => {
									if (deck != undefined) {
										let temp = deck.cards[i - 1];
										deck.cards[i - 1] = card;
										deck.cards[i] = temp;

										temp = card_list[i - 1];
										card_list[i - 1] = card;
										card_list[i] = temp;

										sort_type = "Personnalisé";
									}
								}}
							>
								&#9650
							</button>
						{:else}
							<button class="desactivate">&#9650</button>
						{/if}

						{#if i < deck.cards.length - 1}
							<button
								class="active"
								on:click={() => {
									if (deck != undefined) {
										let temp = deck.cards[i + 1];
										deck.cards[i + 1] = card;
										deck.cards[i] = temp;

										temp = card_list[i + 1];
										card_list[i + 1] = card;
										card_list[i] = temp;

										sort_type = "Personnalisé";
									}
								}}
							>
								&#9660
							</button>
						{:else}
							<button class="desactivate">&#9660</button>
						{/if}
					{/if}
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
		max-height: 70vh;
	}

	.preview {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	#view {
		position: fixed;
		top: 0;
		left: 54vw;
	}
</style>
