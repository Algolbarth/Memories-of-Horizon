<script lang="ts">
	import Logo from "../menu/logo.svelte";
	import type { System } from "$lib/system/class";
	import { Account } from "../profil/account";

	export let system: System;

	function invite() {
		system.account = new Account(system, "Invité");
		system.page = "Menu";
	}
</script>

<div class="container">
	<Logo />

	<br />
	<br />

	<button
		class="big menu"
		on:click={() => {
			system.page = "Login";
		}}
	>
		Connexion
	</button>

	<br />
	<br />

	<button
		class="big menu"
		on:click={() => {
			system.page = "Register";
		}}
	>
		Inscription
	</button>

	<br />
	<br />

	<button
		on:click={() => {
			invite();
		}}
	>
		Jouer en tant qu'invité
	</button>
</div>

<style>
	div.container {
		text-align: center;
	}
</style>
