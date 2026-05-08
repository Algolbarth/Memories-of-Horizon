<script lang="ts">
	import Logo from "../menu/logo.svelte";
	import type { System } from "$lib/system/class";
	import { Account } from "./account";

	export let system: System;

	let name: string = "";

	function register() {
		if (name != "") {
			system.account = new Account(system, name);
			system.page = "Menu";
		}
	}
</script>

<div id="body">
	<Logo />

	<br />
	<br />

	<button
		class="square return"
		on:click={() => {
			system.page = "TitleScreen";
		}}
	>
		↩
	</button>

	<br />
	<br />

	Nom du compte
	<br />

	<input type="text" bind:value={name} />

	<br />
	<br />

	<button
		class="big"
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

	input[type="text"] {
		text-align: center;
		border-bottom: solid;
		border-color: black;
	}

	button.big {
		width: 15vw;
	}
</style>
