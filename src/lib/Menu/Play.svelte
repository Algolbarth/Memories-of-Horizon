<script>
	import { Game } from '../Game/Game.js';

	export let System;

	function aventure() {
		System.game = new Game(System, 'Aventure');
		System.game.init();
		System = System;
	}
</script>

<button
	class="close"
	on:click={() => {
		System.page = 'Menu';
	}}
>
	X
</button>

<div id="body">
	<button
		class="big"
		on:click={() => {
			aventure();
		}}
	>
		Aventure
	</button>

	<br />

	<button
		class="big"
		on:click={() => {
			System.page = 'Construit';
		}}
	>
		Construit
	</button>

	<br />
	<br />

	<button
		class="big"
		on:click={() => {
			System.page = 'Training';
		}}
	>
		Entraînement
	</button>
</div>

<style>
	#body {
		text-align: center;
	}

	button {
		width: 15vw;
	}
</style>
