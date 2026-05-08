<script lang="ts">
	import type { Chapter } from "../chapters/class";
	import type { System } from "$lib/system/class";
	import Typewriter from "./typewriter.svelte";

	export let system: System;
	export let chapter: Chapter;

	let show_dialog: boolean = true;
</script>

<div id="body" class="center">
	<div class="center">
		<div class="container">
			<div class="paper info">
				Chapitre {chapter.number}
			</div>

			<div class="paper info">
				Étape {chapter.step_slot + 1} / {chapter.steps.length}
			</div>
		</div>

		<br />
		<br />

		<div class="paper story">
			{#if show_dialog}
				<Typewriter text={chapter.step.dialogs[chapter.step.dialog]} />
			{/if}
		</div>

		<br />
		<br />

		<button
			class="big"
			on:click={() => {
				chapter.nextDialog();
				system = system;

				show_dialog = false;
				setTimeout(() => {
					show_dialog = true;
				}, 100);
			}}
		>
			Suivant ({chapter.step.dialog + 1}/{chapter.step.dialogs.length})
		</button>
	</div>
</div>

<style>
	#body {
		width: 50vw;
		height: 50vh;

		text-align: center;

		background-color: var(--pannel);
		background-image: var(--wood);

		border: solid;
		border-color: black;
	}

	div.container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		width: 40vw;
	}

	div.paper {
		transition: all var(--delay) ease-in-out;

		background-color: var(--preview);
		background-image: var(--paper);

		padding: 0.5em;

		border: solid;
		border-color: black;
	}

	div.paper:hover {
		transition: all var(--delay_hover) ease-in-out;

		background-color: var(--preview_hover);
	}

	div.info {
		width: 10vw;
		margin-left: 5vw;
	}

	div.story {
		padding: 1em;

		width: 40vw;
		height: 10vh;
	}

	button.big {
		background-color: var(--preview);
		background-image: var(--paper);

		color: black;
		border-color: black;
	}

	button.big:hover {
		color: black;

		border-color: black;

		background-color: var(--preview_hover);
	}
</style>
