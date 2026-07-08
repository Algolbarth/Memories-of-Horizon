<script lang="ts">
	import Entity from "./entity.svelte";
	import Zone from "./zone.svelte";
	import AddCard from "./add-card.svelte";
	import ChangeDeck from "./change-deck.svelte";
	import View from "../cards/view/main.svelte";
	import { Game } from "$lib/game/class";
	import type { System } from "$lib/system/class";

	export let system: System;
</script>

<div class="taskbar">
	<div>
		<button
			class="square close"
			on:click={() => {
				system.view.reset();
				system.page = "Menu";
			}}
		>
			X
		</button>

		<button
			class="square return"
			on:click={() => {
				system.view.reset();
				system.page = "Play";
			}}
		>
			↩
		</button>
	</div>

	<div style="text-align:center">
		<button
			class="taskbar train"
			on:click={() => {
				system.view.reset();
				system.game = new Game(system, "Entraînement");
				system.page = "Game";
			}}
		>
			Lancer l'entraînement
		</button>
	</div>

	<div></div>
</div>

<div id="body" class="scroll">
	<div class="bi-zone">
		<Entity bind:system bind:entity={system.train.player} />
		<Entity bind:system bind:entity={system.train.bot} />
	</div>

	{#each system.train.bot.zones as zone, i}
		<div class="bi-zone">
			<Zone bind:system is_bot={false} bind:zone={system.train.player.zones[i]} />
			<Zone bind:system is_bot={true} bind:zone />
		</div>
	{/each}
</div>

{#if system.train.add.zone != undefined}
	<AddCard bind:system bind:zone={system.train.add.zone} />
{/if}

{#if system.train.add.entity != undefined}
	<ChangeDeck bind:system bind:entity={system.train.add.entity} />
{/if}

{#if system.train.add.zone == undefined}
	<div id="view">
		<View bind:system />
	</div>
{/if}

<style>
	#body {
		height: 90vh;
	}

	.bi-zone {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	button.train {
		background-color: var(--menu);
	}

	button.train:hover {
		background-color: var(--menu_hover);
	}

	#view {
		position: fixed;
		top: 5vh;
		left: 30vw;
	}
</style>
