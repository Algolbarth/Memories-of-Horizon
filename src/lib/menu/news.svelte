<script lang="ts">
	import type { System } from "$lib/system/class";

	export let system: System;

	let view: string = "news";
</script>

<div class="taskbar">
	<div>
		<button
			class="square close"
			on:click={() => {
				system.page = "Menu";
			}}
		>
			X
		</button>
	</div>
	<div>
		<button class="taskbar">Nouveautés</button>
	</div>
</div>

<div class="zone">
	<div class="title">
		<div style="display:flex;align-items:center;justify-content:right;">
			<div class="arrow-wrap left">
				<button
					class="arrow left"
					on:click={() => {
						if (view == "news") {
							view = "incoming";
						} else {
							view = "news";
						}
					}}
				>
					Test
				</button>
			</div>
		</div>

		<div class="paper" style="text-align:center;">
			{#if view == "news"}
				DERNIÈRES FONCTIONNALITÉS
			{:else if view == "incoming"}
				FONCTIONNALITÉS À VENIR
			{/if}
		</div>

		<div style="display:flex;align-items:center;">
			<div class="arrow-wrap right">
				<button
					class="arrow right"
					on:click={() => {
						if (view == "news") {
							view = "incoming";
						} else {
							view = "news";
						}
					}}
				>
					Test
				</button>
			</div>
		</div>
	</div>

	<div class="scroll">
		{#if view == "news"}
			<div class="paper">
				<u>08/05/2026</u>

				<br />

				Nouvelle carte : <span class="card">Garde royal</span>

				<br />

				Carte modifiée : <span class="card">Capitaine de la garde</span> (Niveau 7 -> Niveau 9, Constitution 10 -> Constitution 25, Force 10 -> Force 25)
			</div>
		{:else if view == "incoming"}
			<div class="paper">Rien pour le moment</div>
		{/if}
	</div>
</div>

<style>
	div.zone {
		background-color: var(--pannel);
		background-image: var(--wood);
		height: 87vh;
	}

	div.title {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	div.arrow-wrap {
		position: relative;
		display: inline-flex;
	}

	div.arrow-wrap::before {
		content: "";
		position: absolute;
		inset: -0.2em;
		background: #000;
	}

	div.arrow-wrap.left::before {
		clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
	}

	div.arrow-wrap.right::before {
		clip-path: polygon(100% 50%, 0% 0%, 0% 100%);
	}

	button.arrow {
		position: relative;
		z-index: 1;
		width: 2.5em;
		height: 2.5em;

		background-color: var(--background);
		background-image: var(--metal);

		color: transparent;
	}

	button.arrow:hover {
		background-color: var(--zone);
	}

	button.left {
		transform: translate(0.05em, 0);
		clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
	}

	button.right {
		transform: translate(-0.05em, 0);
		clip-path: polygon(100% 50%, 0% 0%, 0% 100%);
	}

	div.scroll {
		height: 75vh;
	}

	div.paper {
		background-color: var(--preview);
		background-image: var(--paper);

		border: solid;
		border-color: black;

		padding: 1em;
		margin: 1em;
	}

	span.card {
		color: var(--active);
	}
</style>
