<script lang="ts">
	import { save } from "../title-screen/save";
	import type { System } from "$lib/system/class";
	import Logo from "./logo.svelte";

	export let system: System;

	let saved: boolean = false;

	function logout() {
		system.wild_decks = [];
		system.account = undefined;
		system.page = "TitleScreen";
	}
</script>

<div id="body">
	<Logo />

	<div id="list">
		<div class="column">
			<div>
				<button
					class="big menu"
					on:click={() => {
						system.page = "Play";
					}}
				>
					Jouer
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						system.page = "Decks";
					}}
				>
					Decks
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						system.page = "Library";
					}}
				>
					Bibliothèque
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						system.page = "Lore";
					}}
				>
					Histoires
				</button>
			</div>
		</div>

		<div class="column">
			<div>
				<button
					class="big menu"
					on:click={() => {
						system.page = "Profil";
					}}
				>
					Profil
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						system.page = "Settings";
					}}
				>
					Options
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						system.page = "News";
					}}
				>
					Nouveautés
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						save(system);
						saved = true;
						setTimeout(() => {
							saved = false;
						}, 1000);
					}}
				>
					Sauvegarder
				</button>
				<br />
				<button
					on:click={() => {
						logout();
					}}
				>
					Se déconnecter
				</button>
			</div>
		</div>
	</div>
</div>

{#if saved}
	<div class="window">
		<div id="little_body" class="center">Sauvegarde effectuée avec succès</div>
	</div>
{/if}

<style>
	#body {
		text-align: center;
	}

	#list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.column {
		display: grid;
		grid-template-rows: repeat(4, 1fr);
	}

	.window {
		background: var(--shadow);
	}

	#little_body {
		width: 60vw;
		padding: 1vw;
		background: var(--zone);
		background-image: var(--asfalt);
		border: solid;
		border-width: 0.5vmin;
		text-align: center;
	}
</style>
