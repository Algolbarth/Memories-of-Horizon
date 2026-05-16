<script lang="ts">
	import Filter from "../filter/view.svelte";
	import Dropdown from "../utils/dropdown.svelte";
	import View from "../cards/view/main.svelte";
	import { several } from "../utils";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";

	export let system: System;

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
	</div>

	<div>
		<button class="taskbar">Bibliothèque</button>
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
			<div class="preview">
				<button
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
		{/each}
	</div>
</div>

<div id="view">
	<View bind:system />
</div>

{#if filter_window}
	<Filter bind:system {filterFunction} bind:filter_window />
{/if}

<style>
	#list {
		height: 80vh;
	}

	#view {
		position: fixed;
		top: 0;
		left: 54vw;
	}
</style>
