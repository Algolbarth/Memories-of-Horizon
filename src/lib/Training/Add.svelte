<script>
	import View from '../View/Main.svelte';
	import Filter from '../Menu/Filter.svelte';

	export let System;

	function closing() {
		filterWindow = false;
		System.view.reset();
		System.train.add.reset();
		System.pages.change('Training');
	}

	let filterWindow = false;

	let levelSelect = 'Tous';
	let typeSelect = 'Tous';
	let familleSelect = 'Toutes';
	let elementSelect = 'Tous';

	let cardList = [];

	function filter() {
		let tab = [];
		for (const card of System.cards.instance) {
			if (
				(!card.trait('Légendaire').value() || System.train.add.entity == 'bot') &&
				(levelSelect == 'Tous' || card.level == levelSelect) &&
				(typeSelect == 'Tous' || card.type == typeSelect) &&
				(card.type == 'Lieu' ||
					(System.train.add.zone != undefined && System.train.add.zone.name != 'Lieux')) &&
				(card.isUnit() ||
					(System.train.add.zone != undefined && System.train.add.zone.name != 'Terrain')) &&
				(familleSelect == 'Toutes' || card.familles.base.includes(familleSelect)) &&
				(elementSelect == 'Tous' || card.elements.includes(elementSelect))
			) {
				tab.push(card);
			}
		}
		cardList = tab;

		return '';
	}

	function sorting(level, type, famille, element) {
		levelSelect = level;
		typeSelect = type;
		familleSelect = famille;
		elementSelect = element;
		filter();
		close();
	}

	function close() {
		filterWindow = false;
		System.pages.change('Training');
	}
</script>

{#if System.train.add.zone != undefined}
	{filter()}
	<div id="body">
		<button
			class="close"
			on:click={() => {
				closing();
			}}>X</button
		>
		
		<div id="side">
			{System.several(cardList.length, 'carte')}
			-
			<button
				
				on:click={() => {
					filterWindow = true;
					System.pages.change('Training');
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
									System.pages.change('Training');
								}}
								on:mouseenter={() => {
									System.view.quick = card;
									System.pages.change('Training');
								}}
								on:mouseleave={() => {
									System.view.quick = undefined;
									System.pages.change('Training');
								}}>{card.name}</button
							>
						</div>
						<div style="text-align:right;">
							<button
								
								on:click={() => {
									System.train.add.zone.cards.push(card.name);
								}}>Ajouter</button
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div id="view">
		<svelte:component this={View} {System} />
	</div>
{/if}

{#if filterWindow}
	<svelte:component
		this={Filter}
		{System}
		{levelSelect}
		{typeSelect}
		{familleSelect}
		{elementSelect}
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
