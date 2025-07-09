<script>
	import Filter from './Filter.svelte';
	import Dropdown from './Dropdown.svelte';
	import View from '../Cards/View/Main.svelte';
    import { several } from '../Utils';

	export let System;

	let filterWindow = false;
	let sortType = 'Nom';

	let levelSelect = 'Tous';
	let typeSelect = 'Tous';
	let familleSelect = 'Toutes';
	let elementSelect = 'Tous';
	let communSelect = true;
	let rareSelect = false;
	let legendarySelect = false;

	let cardList = [];
	filter();

	function filter() {
		let tab = [];

		for (const card of System.cards.instance) {
			if (
				(levelSelect == 'Tous' || card.level == levelSelect) &&
				(typeSelect == 'Tous' || card.type == typeSelect) &&
				(familleSelect == 'Toutes' || card.familles.total().includes(familleSelect)) &&
				(elementSelect == 'Tous' || card.elements.total().includes(elementSelect)) &&
				((legendarySelect && card.trait('Légendaire').value()) ||
					(rareSelect && card.trait('Rare').value()) ||
					(communSelect && !card.trait('Légendaire').value() && !card.trait('Rare').value()))
			) {
				tab.push(card);
			}
		}

		tab = sort(tab);

		cardList = tab;
	}

	function sort(tab) {
		if (sortType == 'Niveau') {
			for (let i = 0; i < tab.length; i++) {
				let j = i;
				while (j > 0 && tab[j].level < tab[j - 1].level) {
					let swap = tab[j];
					tab[j] = tab[j - 1];
					tab[j - 1] = swap;
					j--;
				}
			}
		}
		return tab;
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

<button
	class="close"
	on:click={() => {
		System.view.reset();
		System.page = 'Menu';
	}}
>
	X
</button>

<div id="zone">
	<div style="display:flex;margin-bottom:2%;">
		<div style="transform:translate(0,25%);margin-right:1%;">
			{several(cardList.length, 'carte')}
			-
			<button
				on:click={() => {
					filterWindow = true;
				}}
			>
				Filtrer
			</button>
			- Trier par
		</div>
		<Dropdown
			array={['Nom', 'Niveau']}
			selected={sortType}
			selecting={function (element) {
				sortType = element;
				filter();
			}}
		/>
	</div>
	<div id="list" class="scroll">
		{#each cardList as card}
			<div class="preview">
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
		{/each}
	</div>
</div>

<div id="view">
	<View bind:System />
</div>

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
	#zone {
		background-color: var(--zone);
		border: solid;
		margin: 1%;
		padding: 1%;
		width: 50vw;
	}

	#list {
		max-height: 80vh;
	}

	#view {
		position: fixed;
		top: 0%;
		left: 54vw;
	}
</style>
