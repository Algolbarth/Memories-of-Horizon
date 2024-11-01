<script>
	import { Game } from '../Game/Game.js';

	export let System;

	function aventure() {
		System.game = new Game(System, 'Aventure');
		System.game.init();
	}
</script>

<button
	class="close"
	on:click={() => {
		System.pages.change('Menu');
	}}>X</button
>

<div id="body">
	<button
		class="big"
		on:click={() => {
			aventure();
		}}>Aventure</button
	>
	<br />
	<button
		class="big"
		on:click={() => {
			System.pages.change('Construit');
		}}>Construit</button
	>
	<br />
	<br />
	<button
		class="big"
		on:click={() => {
			System.pages.change('Training');
		}}>Entraînement</button
	>
</div>

<style>
	#body {
		text-align: center;
	}

	button {
		width: 15vw;
	}
</style>
