<script>
	import { load } from "./Load";

	export let System;

	let files;

	async function login() {
		let log = await load(files, System);
		if (log != undefined) {
			System = log;
		}
	}
</script>

<div id="body">
	<img src="src/assets/Pictures/Title.png" alt="Logo" class="logo" />

	<br />

	<button
		on:click={() => {
			System.page = "TitleScreen";
		}}
	>
		Retour
	</button>

	<br />
	<br />

	Fichier de la save

	<br />
	<br />

	<label for="images">
		<span>Choisir un fichier</span>
		<input type="file" id="images" bind:files />
	</label>

	<br />
	<br />

	{#if files != undefined}
		{files[0].name}

		<br />
		<br />

		<button
			class="big menu"
			on:click={() => {
				login();
			}}
		>
			Valider
		</button>
	{:else}
		Aucun fichier selectionné

		<br />
		<br />

		<button class="big menu desactivate"> Valider </button>
	{/if}
</div>

<style>
	#body {
		text-align: center;
	}
</style>
