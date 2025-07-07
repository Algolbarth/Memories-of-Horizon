<script>
	import { Account } from './Account.js';

	export let System;

	function invite() {
		System.account = new Account(System, 'Invité');
		System.page = 'Menu';
	}
</script>

<div id="body">
	<img src="Pictures/Title.png" alt="Logo" class="logo" />

	<br />

	<button
		class="big"
		on:click={() => {
			System.page = 'Login';
		}}
	>
		Connexion
	</button>

	<br />

	<button
		class="big"
		on:click={() => {
			System.page = 'Register';
		}}
	>
		Inscription
	</button>

	<br />
	<br />

	<button
		on:click={() => {
			invite();
		}}>Jouer en tant qu'invité</button
	>
</div>

<style>
	:global(.logo) {
		height: 30vh;
		margin: 2%;
		border: solid;
	}

	#body {
		text-align: center;
	}

	button.big {
		width: 15vw;
	}
</style>
