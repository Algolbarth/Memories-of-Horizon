<script lang="ts">
	import Logo from "../menu/logo.svelte";
	import type { System } from "$lib/system/class";
	import { load } from "./load";

	export let system: System;

	let files: FileList | null | undefined;

	async function login() {
		if (files instanceof FileList) {
			let log = await load(files, system);
			if (log != undefined) {
				system = log;
			}
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
			class="big"
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

		<button class="big"> Valider </button>
	{/if}
</div>

<style>
	#body {
		text-align: center;
	}

	button.big {
		width: 15vw;
	}
</style>
