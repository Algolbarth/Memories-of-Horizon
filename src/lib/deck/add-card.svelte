<script lang="ts">
	import Filter from "../filter/view.svelte";
	import Dropdown from "../utils/dropdown.svelte";
	import View from "../cards/view/main.svelte";
	import { several } from "../utils";
	import type { System } from "$lib/system/class";
	import type { Card } from "../cards/class";
	import type { Deck } from "./class";

	export let system: System;
	export let deck: Deck;

	let filter_window: boolean = false;
	let sort_type: string = "Nom";
	let card_list: Card[] = [];

	filterFunction();

	function filterFunction() {
		card_list = system.filter.filterCards(system.cards.instance, sort_type);
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
				system.page = "Deck";
			}}
		>
			↩
		</button>
	</div>

	<div>
		<button class="taskbar">Decks</button>
	</div>
</div>

<div class="zone side">
	{several(card_list.length, ["Carte"])}
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
		array={["Nom", "Niveau"]}
		selected={sort_type}
		selecting={function (element: string) {
			sort_type = element;
			filterFunction();
		}}
	/>

	<div id="list" class="scroll">
		{#each card_list as card}
			<div class={(deck.check(card.name) ? "present " : "") + "preview"}>
				<div>
					<button
						class={deck.check(card.name) ? "present " : ""}
						on:click={() => {
							system.view.card = card;
						}}
						on:mouseenter={() => {
							system.view.quick = card;
						}}
						on:mouseleave={() => {
							system.view.quick = undefined;
						}}
					>
						{card.name}
					</button>
				</div>

				<div style="text-align:right;">
					{#if !deck.check(card.name)}
						<button
							class="active"
							on:click={() => {
								deck.add(card.name);
								system = system;
							}}
						>
							Ajouter
						</button>
					{:else}
						<button
							class="remove"
							on:click={() => {
								deck.remove(card.name);
								system = system;
							}}
						>
							Enlever
						</button>
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
	<Filter bind:system bind:filter_window {filterFunction} />
{/if}

<style>
	#list {
		max-height: 80vh;
	}

	.preview {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	div.present {
		background-color: rgb(173, 131, 52);
	}

	div.present:hover {
		background-color: rgb(173, 131, 52);
	}

	button.remove {
		color: var(--close);
	}

	button.remove:hover {
		color: var(--close_hover);
	}

	#view {
		position: fixed;
		top: 0;
		left: 54vw;
	}
</style>
