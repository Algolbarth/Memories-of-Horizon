<script>
	import { Deck } from './Deck.js';
	import View from './View.svelte';
	export let System;

	function newDeck() {
		let deck = new Deck(System);
		System.decks.push(deck);
		System.deck = deck;
		System.pages.change('Deck');
	}
</script>

<button
	class="close"
	on:click={() => {
		System.view.reset();
		System.pages.change('Menu');
	}}>X</button
>
<br />
<div id="zone">
	{System.several(System.decks.length, 'deck')} -
	<button
		class="classic"
		on:click={() => {
			newDeck();
		}}>Créer un nouveau deck</button
	>
	<br />
	<div id="list" class="scroll">
		{#each System.decks as deck, i}
			<div class="preview">
				<div>
					<button
						class="classic"
						on:mouseenter={() => {
							System.view.quick = deck;
							System.pages.change('Decks');
						}}
						on:mouseleave={() => {
							System.view.quick = undefined;
							System.pages.change('Decks');
						}}
						on:click={() => {
							System.view.card = deck;
							System.pages.change('Decks');
						}}>{deck.name}</button
					>
				</div>
				<div style="text-align:right">
					<button
						on:click={() => {
							System.deck = deck;
							System.view.reset();
							System.pages.change('Deck');
						}}
					>
						Modifier
					</button>
					{#if i > 0}
						<button
							class="classic"
							on:click={() => {
								let temp = System.decks[i - 1];
								System.decks[i - 1] = deck;
								System.decks[i] = temp;
								System.pages.change('Decks');
							}}>&#9650</button
						>
					{:else}
						<button class="classic useless">&#9650</button>
					{/if}
					{#if i < System.decks.length - 1}
						<button
							class="classic"
							on:click={() => {
								let temp = System.decks[i + 1];
								System.decks[i + 1] = deck;
								System.decks[i] = temp;
								System.pages.change('Decks');
							}}>&#9660</button
						>
					{:else}
						<button class="classic useless">&#9660</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<div id="view">
	<svelte:component this={View} {System} />
</div>

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
		border: solid;
		margin-top: 1%;
		margin-bottom: 1%;
		margin-right: 2%;
		padding: 1%;
		background-color: var(--preview_deck);
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
