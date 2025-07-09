<script>
	import { Game } from '../Game/Game.js';
	import View from '../Decks/View.svelte';
    import { several } from '../Utils';

	export let System;

	let array = [];

	for (const deck of System.decks) {
		if (deck.playable()) {
			array.push(deck);
		}
	}
</script>

<button
	class="close"
	on:click={() => {
		System.view.reset();
		System.page = 'Play';
	}}
>
	X
</button>

<br />

<div id="zone">
	{several(array.length, 'deck')} jouable{#if array.length > 1}s{/if}
	<div id="list" class="scroll">
		{#each array as deck}
			<div class="preview">
				<div>
					<button
						on:mouseenter={() => {
							System.view.quick = deck;
						}}
						on:mouseleave={() => {
							System.view.quick = undefined;
						}}
						on:click={() => {
							System.view.card = deck;
						}}
					>
						{deck.name}
					</button>
				</div>
				<div style="text-align:right">
					<button
						on:click={() => {
							System.view.reset();
							System.game = new Game(System, 'Construit');
							System.game.deck = deck;
							System.game.init();
							System = System;
						}}
					>
						Jouer
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<div id="view">
	<View bind:System />
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

	#view {
		position: fixed;
		top: 0%;
		left: 54vw;
	}
</style>
