<script>
	import DoubleZone from './DoubleZone.svelte';
	import Entity from './Entity.svelte';
	import View from '../View/Main.svelte';
	import Use from './Use.svelte';
	import Flux from './Flux.svelte';
	import Pause from './Pause.svelte';

	export let System;
</script>

<div id="taskbar">
	<div>
		{#if System.game.mode != 'Entraînement'}
			Chapitre {System.game.chapter.number} - Étape {System.game.player.step} / {System.game.chapter
				.steps.length} -
		{/if}
		{#if !System.game.isBattle()}
			<button
				on:click={() => {
					System.view.reset();
					System.game.newBattle();
				}}
			>
				Combattre
			</button>
			{#if System.game.mode == 'Entraînement'}
				-
				<button
					on:click={() => {
						System.view.reset();
						System.game.bot.play();
						System.pages.change('Game');
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
						System.pages.change('Game');
					}}
				>
					Désactiver mode auto
				</button>
			{:else}
				<button
					on:click={() => {
						System.game.startAuto();
						System.pages.change('Game');
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
				System.pages.change('Game');
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
			<svelte:component this={Entity} {System} entity={System.game.player} />
		</div>
		<div style="text-align:right;">
			<svelte:component this={Entity} {System} entity={System.game.bot} />
		</div>
	</div>

	{#if !System.game.isBattle()}
		<svelte:component this={DoubleZone} {System} zone={'Lieux'} />
		<svelte:component this={DoubleZone} {System} zone={'Boutique'} />
		<svelte:component this={DoubleZone} {System} zone={'Main'} />
	{/if}

	<svelte:component this={DoubleZone} {System} zone={'Terrain'} />

	{#if !System.game.isBattle()}
		<svelte:component this={DoubleZone} {System} zone={'Défausse'} />
	{/if}
</div>

<svelte:component this={Use} {System} />

<svelte:component this={Flux} {System} />

<div class="center">
	<svelte:component this={View} {System} />
</div>

<svelte:component this={Pause} {System} />

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
