<script lang="ts">
	import Filter from "../filter/view.svelte";
	import Dropdown from "../utils/dropdown.svelte";
	import View from "../cards/view/main.svelte";
	import { several } from "../utils";
	import type { System } from "$lib/system/class";
	import { Card } from "$lib/cards/class/card";
	import { Unit } from "../cards/class/unit";
	import type { TrainZone } from "./train";

	export let system: System;
	export let zone: TrainZone;

	let filter_window: boolean = false;
	let sort_type: string = "Nom";
	let card_list: Card[] = [];

	filterFunction();

	function filterFunction() {
		let condition = (card: Card) => {
			if ((card.type == "Lieu" || (zone != undefined && zone.name != "Région")) && (card instanceof Unit || (zone != undefined && zone.name != "Terrain"))) {
				return true;
			}
			return false;
		};
		card_list = system.filter.filterCards(system.cards.instance, sort_type, condition);
	}

	function close() {
		filter_window = false;
		system.view.reset();
		system.filter.resetSelection();
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
				<button class="taskbar">Ajouter une carte</button>
			</div>
		</div>

		<div class="zone side">
			{zone.name}
			-
			{#if zone.name != "Défausse"}
				({zone.cards.length} / {zone.size}) -
			{:else}
				({zone.cards.length} / ∞) -
			{/if}
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
				array={["Nom", "Niveau", "Coût"]}
				selected={sort_type}
				selecting={function (element: string) {
					sort_type = element;
					filterFunction();
				}}
			/>

			<div id="list" class="scroll">
				{#each card_list as card}
					<div class="preview">
						<div>
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

						<div style="text-align:right;">
							{#if zone.size == undefined || zone.size > zone.cards.length}
								<button
									class="active"
									on:click={() => {
										zone.cards.push(card.name);
										system = system;
									}}
								>
									Ajouter
								</button>
							{:else}
								<button class="desactivate">Ajouter</button>
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

{#if filter_window}
	<Filter bind:system bind:filter_window {filterFunction} />
{/if}

<style>
	#list {
		height: 80vh;
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
