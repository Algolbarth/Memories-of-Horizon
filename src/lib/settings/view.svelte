<script lang="ts">
	import type { System } from "$lib/system/class";

	export let system: System;

	function close() {
		if (system.game == undefined) {
			system.page = "Menu";
		} else {
			system.page = "Game";
		}
	}

	let delay: number = 5 - system.settings.auto_speed / 500;
</script>

<div class="taskbar">
	<div>
		<button
			class="square close"
			on:click={() => {
				close();
			}}
		>
			X
		</button>
	</div>

	<div>
		<button class="taskbar">Options</button>
	</div>
</div>

<div class="zone">
	<div class="music_container">
		<div class="slide_container" style="width: 100%;">
			<label for="volume"> Musique </label>
			<input
				type="range"
				min="0"
				max="100"
				bind:value={system.music.volume}
				on:change={() => {
					if (system.music.current != undefined) {
						system.music.current.volume = system.music.volume / 100;
					}
				}}
				id="volume"
			/>
			<label for="volume" style="text-align:center;">
				{system.music.volume}%
			</label>
		</div>

		<div style="text-align: center;">
			{system.music.list[system.music.slot].name} - {system.music.list[system.music.slot].album.name}
		</div>
	</div>

	<br />

	<div class="checkbox-container">
		<label class="form-control" for="show_intelligence">
			<input type="checkbox" bind:checked={system.settings.show_intelligence} id="show_intelligence" />
			Afficher le total d'intelligence
		</label>

		<label class="form-control" for="show_luck">
			<input type="checkbox" bind:checked={system.settings.show_luck} id="show_luck" />
			Afficher le total de chance
		</label>

		<label class="form-control" for="autoplay">
			<input type="checkbox" bind:checked={system.settings.autoplay} id="autoplay" />
			Lance les combats automatiques
		</label>
	</div>

	<br />

	<div class="slide_container">
		<label for="delay"> Vitesse des combats automatiques </label>
		<div>
			<input
				type="range"
				min="1"
				max="4"
				bind:value={delay}
				on:change={() => {
					system.settings.auto_speed = (5 - delay) * 500;
				}}
				id="delay"
			/>
		</div>
		<label for="delay" style="text-align:center;">
			{(5 - delay) / 2}s par action
		</label>
	</div>

	<br />

	<div class="checkbox-container">
		<label class="form-control" for="show_card_description">
			<input type="checkbox" bind:checked={system.settings.show_card_description} id="show_card_description" />
			Afficher la description des cartes
		</label>
	</div>

	<br />

	<button
		class="square clear"
		on:click={() => {
			system.music.volume = 50;
			if (system.music.current != undefined) {
				system.music.current.volume = 0.5;
			}

			system.settings.show_intelligence = false;
			system.settings.autoplay = false;
			system.settings.auto_speed = 1000;
			system.settings.show_card_description = true;
		}}
	>
		⭯
	</button>
</div>

<style>
	div.music_container {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	div.slide_container {
		width: 50%;
		display: grid;
		grid-template-columns: 17em 10fr 5fr;
	}
</style>
