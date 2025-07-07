<script>
	import Entity from './Entity.svelte';
	import Zone from './Zone.svelte';
	import Add from './Add.svelte';
	import View from '../View/Main.svelte';
	import { Game } from '../Game/Game.js';

	export let System;
</script>

<div>
	<button
		class="close"
		on:click={() => {
			System.view.reset();
			System.page = 'Play';
		}}
	>
		X
	</button>
	<div style="text-align:center">
		<button
			class="big"
			on:click={() => {
				System.view.reset();
				System.game = new Game(System, 'Entraînement');
				System.game.deck = System.train.deck;
				System.game.init();
				System.page = 'Game';
			}}
		>
			Lancer l'entraînement
		</button>
	</div>
</div>

<div id="body" class="scroll">
	<div class="bi-zone">
		<Entity bind:entity={System.train.player} />
		<Entity bind:entity={System.train.bot} />
	</div>
	{#each System.train.bot.zones as zone, i}
		<div class="bi-zone">
			<Zone bind:System entity="player" bind:zone={System.train.player.zones[i]} />
			<Zone bind:System entity="bot" bind:zone />
		</div>
	{/each}
</div>

<Add bind:System />

{#if System.train.add.zone == undefined}
	<div class="center">
		<View bind:System />
	</div>
{/if}

<style>
	#body {
		height: 80vh;
	}

	.bi-zone {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
