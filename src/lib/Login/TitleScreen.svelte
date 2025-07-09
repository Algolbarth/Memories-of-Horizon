<script>
	import { Account } from "./Account.js";

	export let System;

	function invite() {
		System.account = new Account(System, "Invité");
		System.page = "Menu";
	}
</script>

<div class="container">
	<img src="src/assets/Pictures/Title.png" alt="Logo" class="logo" />

	<br />

	<button
		class="big menu"
		on:click={() => {
			System.page = "Login";
		}}
	>
		Connexion
	</button>

	<br />

	<button
		class="big menu"
		on:click={() => {
			System.page = "Register";
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
	div.container {
		text-align: center;
	}
</style>
