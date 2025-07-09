<script>
	import View from "../Cards/View/Main.svelte";
	import Filter from "../Menu/Filter.svelte";
	import { several } from "../Utils";

	export let System;

	function closing() {
		filterWindow = false;
		System.view.reset();
		System.train.add.reset();
		System = System;
	}

	let filterWindow = false;

	let levelSelect = "Tous";
	let typeSelect = "Tous";
	let familleSelect = "Toutes";
	let elementSelect = "Tous";
	let communSelect = true;
	let rareSelect = false;
	let legendarySelect = false;

	let cardList = [];

	$: zone = System.train.add.zone;

	function filter() {
		let tab = [];
		for (const card of System.cards.instance) {
			if (
				(!card.trait("Légendaire").value() ||
					System.train.add.entity == "bot") &&
				(levelSelect == "Tous" || card.level == levelSelect) &&
				(typeSelect == "Tous" || card.type == typeSelect) &&
				(card.type == "Lieu" ||
					(zone != undefined && zone.name != "Lieux")) &&
				(card.isUnit() ||
					(zone != undefined && zone.name != "Terrain")) &&
				(familleSelect == "Toutes" ||
					card.familles.total().includes(familleSelect)) &&
				(elementSelect == "Tous" ||
					card.elements.total().includes(elementSelect)) &&
				((legendarySelect && card.trait("Légendaire").value()) ||
					(rareSelect && card.trait("Rare").value()) ||
					(communSelect &&
						!card.trait("Légendaire").value() &&
						!card.trait("Rare").value()))
			) {
				tab.push(card);
			}
		}
		cardList = tab;

		return "";
	}

	function sorting(level, type, famille, element, commun, rare, legendary) {
		levelSelect = level;
		typeSelect = type;
		familleSelect = famille;
		elementSelect = element;
		communSelect = commun;
		rareSelect = rare;
		legendarySelect = legendary;
		filter();
		close();
	}

	function close() {
		filterWindow = false;
	}
</script>

{#if zone != undefined}
	{filter()}
	<div id="body">
		<button
			class="close"
			on:click={() => {
				closing();
			}}
		>
			X
		</button>

		<div id="side">
			{zone.name}
			-
			{#if zone.name != "Défausse"}
				({zone.cards.length} / {zone.size}) -
			{/if}
			{several(cardList.length, "carte")}
			-
			<button
				on:click={() => {
					filterWindow = true;
				}}
			>
				Filtrer
			</button>

			<div id="list" class="scroll">
				{#each cardList as card}
					<div class="preview">
						<div>
							<button
								on:click={() => {
									System.view.card = card;
								}}
								on:mouseenter={() => {
									System.view.quick = card;
								}}
								on:mouseleave={() => {
									System.view.quick = undefined;
								}}
							>
								{card.name}
							</button>
						</div>
						<div style="text-align:right;">
							{#if zone.name == "Défausse" || zone.size > zone.cards.length}
								<button
									on:click={() => {
										zone.cards.push(card.name);
										System = System;
									}}
								>
									Ajouter
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div id="view">
		<View bind:System />
	</div>
{/if}

{#if filterWindow}
	<Filter
		bind:System
		{levelSelect}
		{typeSelect}
		{familleSelect}
		{elementSelect}
		{communSelect}
		{rareSelect}
		{legendarySelect}
		{sorting}
		{close}
	/>
{/if}

<style>
	#body {
		position: fixed;
		background: var(--background);
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		padding: 1%;
	}

	#side {
		background-color: var(--zone);
		border: solid;
		padding: 1%;
		width: 50vw;
	}

	#list {
		max-height: 85vh;
	}

	.preview {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	#view {
		position: fixed;
		top: 0%;
		left: 54vw;
	}
</style>
