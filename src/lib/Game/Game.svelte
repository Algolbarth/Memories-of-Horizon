<script>
	import DoubleZone from "./DoubleZone.svelte";
	import Entity from "./Entity.svelte";
	import View from "../Cards/View/Main.svelte";
	import Use from "./Use.svelte";
	import Flux from "./Flux.svelte";
	import Pause from "./Pause.svelte";
	import { onDestroy, onMount } from "svelte";

	export let System;

	let auto;

	function refresh() {
		System = System;
	}

	onMount(() => {
		auto = setInterval(refresh, 100);
	});

	onDestroy(() => {
		clearInterval(auto);
		auto = null;
	});
</script>

<div id="taskbar">
	<div>
		{#if System.game.mode != "Entraînement"}
			Chapitre {System.game.chapter.number}
			- Étape {System.game.player.step} / {System.game.chapter.steps
				.length}
			-
		{/if}
		{#if !System.game.isBattle()}
			<button
				on:click={() => {
					System.view.reset();
					System.game.newBattle();
					System = System;
				}}
			>
				Combattre
			</button>
			{#if System.game.mode == "Entraînement"}
				-
				<button
					on:click={() => {
						System.view.reset();
						System.game.bot.play();
						System = System;
					}}
				>
					Tour de l'ordi
				</button>
			{/if}
		{:else if !System.game.isEndBattle()}
			Tour de combat {System.game.turn}
			-
			{#if System.game.auto != null}
				<button
					on:click={() => {
						System.game.stopAuto();
					}}
				>
					Désactiver mode auto
				</button>
			{:else}
				<button
					on:click={() => {
						System.game.startAuto();
					}}
				>
					Activer mode auto
				</button>
				-
				<button
					on:click={() => {
						System.view.reset();
						System.game.actionBattle();
					}}
				>
					Prochaine action
				</button>
			{/if}
		{:else}
			Combat fini -
			<button
				on:click={() => {
					System.view.reset();
					System.game.actionBattle();
					System = System;
				}}
			>
				Résultats
			</button>
		{/if}
	</div>
	<div style="text-align:right">
		<button
			on:click={() => {
				System.game.pause = true;
				System.page = "Game";
			}}
		>
			Pause
		</button>
	</div>
</div>

<br />

<div id="container" class="scroll">
	<div class="zone">
		<div>
			<Entity bind:System bind:entity={System.game.player} />
		</div>
		<div style="text-align:right;">
			<Entity bind:System bind:entity={System.game.bot} />
		</div>
	</div>

	{#if !System.game.isBattle()}
		<DoubleZone bind:System zone={"Lieux"} />
		<DoubleZone bind:System zone={"Boutique"} />
		<DoubleZone bind:System zone={"Main"} />
	{/if}

	<DoubleZone bind:System zone={"Terrain"} />

	{#if !System.game.isBattle()}
		<DoubleZone bind:System zone={"Défausse"} />
	{/if}
</div>

<Use bind:System />

<Flux bind:System />

<div class="center">
	<View bind:System />
</div>

<Pause bind:System />

<style>
	#taskbar {
		height: 2vh;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	#container {
		height: 94vh;
	}

	.zone {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
