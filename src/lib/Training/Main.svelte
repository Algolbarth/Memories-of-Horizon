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
			System.pages.change('Play');
		}}>X</button
	>
	<div style="text-align:center">
		<button
			class="big"
			on:click={() => {
				System.view.reset();
				System.game = new Game(System, 'Entraînement');
				System.game.deck = System.train.deck;
				System.game.init();
			}}>Jouer</button
		>
	</div>
</div>

<div id="body" class="scroll">
	<div class="bi-zone">
		<svelte:component this={Entity} entity={System.train.player} />
		<svelte:component this={Entity} entity={System.train.bot} />
	</div>
	{#each System.train.bot.zones as zone, i}
		<div class="bi-zone">
			<svelte:component this={Zone} {System} entity="player" zone={System.train.player.zones[i]} />
			<svelte:component this={Zone} {System} entity="bot" {zone} />
		</div>
	{/each}
</div>

<svelte:component this={Add} {System} />

{#if System.train.add.zone == undefined}
	<div class="center">
		<svelte:component this={View} {System} />
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
