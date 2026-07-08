<script lang="ts">
	import DoubleZone from "./double-zone.svelte";
	import Entity from "./entity.svelte";
	import View from "../cards/view/main.svelte";
	import UserInterface from "../cards/user-interface/use.svelte";
	import Flux from "./flux.svelte";
	import Pause from "./pause.svelte";
	import { onDestroy, onMount } from "svelte";
	import type { System } from "$lib/system/class";
	import type { Game } from "./class";

	export let system: System;
	export let game: Game;

	let show_flux: boolean = false;
	let auto: number | undefined;

	function refresh() {
		system = system;
	}

	onMount(() => {
		auto = setInterval(refresh, 100);
	});

	onDestroy(() => {
		clearInterval(auto);
		auto = undefined;
	});
</script>

<div class="taskbar">
	<div>
		{#if game.mode != "Entraînement" && game.chapter}
			<button class="taskbar info">
				Chapitre {game.chapter.number}
			</button>

			<button class="taskbar info">
				Étape {game.chapter.step_slot + 1} / {game.chapter.steps.length}
			</button>
		{/if}

		{#if game.isBattle() && !game.isEndBattle()}
			<button class="taskbar info">
				Round {game.round} / 5
			</button>
		{/if}
	</div>

	<div style="text-align:center;">
		{#if !game.isBattle()}
			<button
				class="taskbar fight"
				on:click={() => {
					if (game) {
						system.view.reset();
						game.startBattle();
						system = system;
					}
				}}
			>
				Combattre
			</button>

			{#if game.mode == "Entraînement"}
				<button
					class="taskbar bot_turn"
					on:click={() => {
						if (game) {
							system.view.reset();
							game.bot.play();
							system = system;
						}
					}}
				>
					Tour de l'ordi
				</button>
			{/if}
		{:else if !game.isEndBattle()}
			{#if game.auto != null}
				<button
					class="taskbar"
					on:click={() => {
						if (game) {
							game.stopAuto();
						}
					}}
				>
					Désactiver mode auto
				</button>
			{:else}
				<button
					class="taskbar"
					on:click={() => {
						if (game) {
							game.startAuto();
						}
					}}
				>
					Activer mode auto
				</button>

				<button
					class="taskbar"
					on:click={() => {
						if (game) {
							system.view.reset();
							game.actionBattle();
						}
					}}
				>
					Prochaine action
				</button>
			{/if}
		{:else}
			<button
				class="taskbar"
				on:click={() => {
					if (game) {
						system.view.reset();
						game.actionBattle();
						system = system;
					}
				}}
			>
				Résultats
			</button>
		{/if}
	</div>

	<div style="text-align:right">
		<button
			class="taskbar"
			on:click={() => {
				if (game) {
					game.pause = true;
					system.page = "Game";
				}
			}}
		>
			Pause
		</button>
	</div>
</div>

<div id="container" class="scroll">
	<div class="entities">
		<div>
			<Entity bind:system bind:game bind:entity={game.player} direction={"left"} bind:show_flux />
		</div>
		<div style="text-align:right;">
			<Entity bind:system bind:game bind:entity={game.bot} direction={"right"} bind:show_flux />
		</div>
	</div>

	{#if !game.isBattle()}
		<DoubleZone bind:system bind:game zone={"Région"} />
		<DoubleZone bind:system bind:game zone={"Pile"} />
		<DoubleZone bind:system bind:game zone={"Inventaire"} />
	{/if}

	<DoubleZone bind:system bind:game zone={"Terrain"} />

	{#if !game.isBattle()}
		<DoubleZone bind:system bind:game zone={"Défausse"} />
	{/if}
</div>

{#if game.user_interface != undefined}
	<UserInterface bind:system bind:game bind:user_interface={game.user_interface} />
{/if}

{#if show_flux}
	<Flux bind:system bind:game bind:show_flux />
{/if}

{#if game.user_interface == undefined}
	<div id="view">
		<View bind:system />
	</div>
{/if}

{#if game.pause}
	<Pause bind:system bind:game />
{/if}

<style>
	#container {
		height: 90vh;
	}

	.entities {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	button.fight {
		background-color: var(--close);
	}

	button.fight:hover {
		background-color: var(--close_hover);
	}

	button.bot_turn {
		background-color: var(--active);
	}

	button.bot_turn:hover {
		color: black;
		background-color: var(--active_hover);
	}

	button.info:hover {
		color: black;
	}

	#view {
		position: fixed;
		top: 5vh;
		left: 30vw;
	}
</style>
