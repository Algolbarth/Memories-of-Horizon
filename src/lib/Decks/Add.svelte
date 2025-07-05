<script>
	import Filter from '../Menu/Filter.svelte';
	import View from '../View/Main.svelte';
	export let System;

	let filterWindow = false;

	let levelSelect = 'Tous';
	let typeSelect = 'Tous';
	let familleSelect = 'Toutes';
	let elementSelect = 'Tous';

	let cardList = [];
	filter();

	function filter() {
		let tab = [];
		for (const card of System.cards.instance) {
			if (
				!card.trait('Rare').value() &&
				!card.trait('Légendaire').value() &&
				(levelSelect == 'Tous' || card.level == levelSelect) &&
				(typeSelect == 'Tous' || card.type == typeSelect) &&
				(familleSelect == 'Toutes' || card.familles.total().includes(familleSelect)) &&
				(elementSelect == 'Tous' || card.elements.total().includes(elementSelect))
			) {
				tab.push(card);
			}
		}
		cardList = tab;
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
		System.pages.change('Add');
	}
</script>

<button
	class="close"
	on:click={() => {
		System.view.reset();
		System.pages.change('Deck');
	}}>X</button
>
<br />
<div id="zone">
	{System.several(cardList.length, 'carte')}
	-
	<button
		on:click={() => {
			filterWindow = true;
			System.pages.change('Add');
		}}
	>
		Filtrer
	</button>
	<div id="list" class="scroll">
		{#each cardList as card}
			<div class={(System.deck.check(card.name) ? 'present ' : '') + 'preview'}>
				<div>
					<button
						class={(System.deck.check(card.name) ? 'present ' : '')}
						on:click={() => {
							System.view.card = card;
							System.pages.change('Add');
						}}
						on:mouseenter={() => {
							System.view.quick = card;
							System.pages.change('Add');
						}}
						on:mouseleave={() => {
							System.view.quick = undefined;
							System.pages.change('Add');
						}}
					>
						{card.name}
					</button>
				</div>
				<div style="text-align:right;">
					{#if !System.deck.check(card.name)}
						<button
							on:click={() => {
								System.deck.add(card.name);
							}}
						>
							Ajouter
						</button>
					{:else}
						<button
						class="present"
							on:click={() => {
								System.deck.remove(card.name);
								System.pages.change('Add');
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
	<svelte:component this={View} {System} />
</div>

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
	#zone {
		background-color: var(--zone);
		border: solid;
		margin: 1%;
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

	.present {
		background-color: rgb(86, 58, 7);
		color: gold;
	}

	.present:hover {
		background-color: rgb(86, 58, 7);
		color: gold;
	}

	#view {
		position: fixed;
		top: 0%;
		left: 54vw;
	}
</style>
