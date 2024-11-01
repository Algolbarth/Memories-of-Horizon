<script>
	import { Account } from './Account.js';
	export let System;

	let name = '';

	function register() {
		if (name != '') {
			System.account = new Account(System, name);
			System.pages.change('Menu');
		}
	}
</script>

<div id="body">
	<img src="Pictures/Title.png" alt="Logo" class="logo" />
	<br />
	<button
		class="classic"
		on:click={() => {
			System.pages.change('TitleScreen');
		}}>Retour</button
	>
	<br /><br />
	Nom du compte
	<br />
	<input type="text" bind:value={name} />
	<br /><br />
	<button
		class="big"
		on:click={() => {
			register();
		}}>Valider</button
	>
</div>

<style>
	#body {
		text-align: center;
	}

	button.big {
		width: 15vw;
	}

	input[type='text'] {
		text-align: center;
		border-bottom: solid;
		border-color: black;
	}
</style>
