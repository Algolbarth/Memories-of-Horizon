<script>
	import Filter from '../Menu/Filter.svelte';
	import View from '../View/Main.svelte';

	export let System;

	let name = System.deck.name;
	let sorted = false;
	let move;
	if (System.deck.canModify()) {
		move = false;
	} else {
		move = true;
	}

	let levelSelect = 'Tous';
	let typeSelect = 'Tous';
	let familleSelect = 'Toutes';
	let elementSelect = 'Tous';

	let cardList = [];
	cards();

	function cards() {
		let tab = [];
		for (const cardName of System.deck.cards) {
			let card = System.cards.getByName(cardName);
			if (
				(levelSelect == 'Tous' || card.level == levelSelect) &&
				(typeSelect == 'Tous' || card.type == typeSelect) &&
				(familleSelect == 'Toutes' || card.familles.total().includes(familleSelect)) &&
				(elementSelect == 'Tous' || card.elements.total().includes(elementSelect))
			) {
				tab.push(cardName);
			}
		}
		cardList = tab;
	}

	function sorting(level, type, famille, element) {
		levelSelect = level;
		typeSelect = type;
		familleSelect = famille;
		elementSelect = element;
		cards();
		close();
	}

	function close() {
		sorted = false;
	}
</script>

<button
	class="close"
	on:click={() => {
		System.view.reset();
		System.page = 'Decks';
	}}
>
	X
</button>

<br />

<div id="head" class="zone">
	<div>
		<input type="text" bind:value={name} />
		{#if name != System.deck.name}
			<button
				on:click={() => {
					System.deck.changeName(name, 0);
				}}
			>
				Renommer
			</button>
		{/if}

		<br />

		<button
			on:click={() => {
				System.view.reset();
				System.deck.clone();
				System.page = 'Decks';
			}}
		>
			Cloner
		</button>
	</div>
	<div style="text-align:right;">
		<button
			class="classic delete"
			on:click={() => {
				System.view.reset();
				System.deck.delete();
				System = System;
				System.page = 'Decks';
			}}
		>
			Supprimer
		</button>
	</div>
</div>
<div class="zone">
	{cardList.length}
	/
	{System.several(System.deck.cards.length, 'carte')}
	-
	<button
		on:click={() => {
			sorted = true;
		}}
	>
		Filtrer
	</button>
	{#if System.deck.canModify()}
		-
		<button
			on:click={() => {
				System.view.reset();
				System.page = 'Add';
			}}
		>
			Modifier les cartes
		</button>
	{/if}
	<div id="list">
		{#each cardList as card, i}
			<div class="preview">
				<div>
					<button
						on:click={() => {
							System.view.card = System.cards.getByName(card);
						}}
						on:mouseenter={() => {
							System.view.quick = System.cards.getByName(card);
						}}
						on:mouseleave={() => {
							System.view.quick = undefined;
						}}
					>
						{card}
					</button>
				</div>
				<div style="text-align:right;">
					{#if i > 0}
						<button
							on:click={() => {
								let temp = System.deck.cards[i - 1];
								System.deck.cards[i - 1] = card;
								System.deck.cards[i] = temp;
								cards();
							}}
						>
							&#9650
						</button>
					{:else}
						<button class="classic useless">&#9650</button>
					{/if}
					{#if i < System.deck.cards.length - 1}
						<button
							on:click={() => {
								let temp = System.deck.cards[i + 1];
								System.deck.cards[i + 1] = card;
								System.deck.cards[i] = temp;
								cards();
							}}
						>
							&#9660
						</button>
					{:else}
						<button class="classic useless">&#9660</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<div id="view">
	<View bind:System />
</div>

{#if sorted}
	<Filter
		bind:System
		{levelSelect}
		{typeSelect}
		{familleSelect}
		{elementSelect}
		rarity={false}
		{sorting}
		{close}
	/>
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
		background-color: var(--zone);
		border: solid;
		margin: 1%;
		padding: 1%;
		width: 50vw;
	}

	#list {
		max-height: 85vh;
		overflow-y: scroll;
	}

	.preview {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.useless {
		color: lightgrey;
	}

	#view {
		position: fixed;
		top: 0%;
		left: 54vw;
	}
</style>
