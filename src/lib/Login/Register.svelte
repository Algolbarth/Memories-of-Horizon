<script>
	import { Account } from './Account.js';

	export let System;

	let name = '';

	function register() {
		if (name != '') {
			System.account = new Account(System, name);
			System.page = 'Menu';
		}
	}
</script>

<div id="body">
	<img src="src/assets/Pictures/Title.png" alt="Logo" class="logo" />

	<br />

	<button
		on:click={() => {
			System.page = 'TitleScreen';
		}}
	>
		Retour
	</button>

	<br />
	<br />

	Nom du compte
	<br />

	<input type="text" bind:value={name} />

	<br />
	<br />

	<button
		class="big menu"
		on:click={() => {
			register();
		}}
	>
		Valider
	</button>
</div>

<style>
	#body {
		text-align: center;
	}

	input[type='text'] {
		text-align: center;
		border-bottom: solid;
		border-color: black;
	}
</style>
