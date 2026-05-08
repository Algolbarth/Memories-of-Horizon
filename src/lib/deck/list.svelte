<script lang="ts">
	import type { System } from "$lib/system/class";
	import { several } from "../utils";
	import { Deck } from "./class";
	import View from "./preview.svelte";

	export let system: System;
	export let decks: Deck[];
	export let mode: string;

	function newDeck() {
		let deck = new Deck(system);
		system.wild_decks.push(deck);
		system.deck = deck;
		system.page = "Deck";
	}
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
				system.page = "Decks";
			}}
		>
			↩
		</button>
	</div>

	<div>
		<button class="taskbar">Decks {mode}</button>
	</div>
</div>

<div class="zone side">
	<div class="zone_taskbar">
		<div>
			{several(decks.length, ["Deck"])}
		</div>

		{#if mode == "Libre"}
			<div style="text-align: right;">
				<button
					class="active"
					on:click={() => {
						newDeck();
					}}
				>
					Créer un nouveau deck
				</button>
			</div>
		{/if}
	</div>

	<div id="list" class="scroll">
		{#each decks as deck, i}
			<div class="preview">
				<div>
					<button
						on:mouseenter={() => {
							system.view.quick = deck;
						}}
						on:mouseleave={() => {
							system.view.quick = undefined;
						}}
						on:click={() => {
							system.view.card = deck;
						}}
					>
						{deck.name}
					</button>
				</div>

				<div style="text-align:right">
					<button
						class="active arrow"
						on:click={() => {
							system.deck = deck;
							system.view.reset();
							system.page = "Deck";
						}}
					>
						{#if mode == "Standard"}
							Consulter
						{:else if mode == "Libre"}
							Modifier
						{/if}
					</button>

					{#if mode == "Libre"}
						{#if i > 0}
							<button
								class="active arrow"
								on:click={() => {
									let temp = system.wild_decks[i - 1];
									system.wild_decks[i - 1] = deck;
									system.wild_decks[i] = temp;
								}}
							>
								&#9650
							</button>
						{:else}
							<button class="desactivate">&#9650</button>
						{/if}
						{#if i < system.wild_decks.length - 1}
							<button
								class="active arrow"
								on:click={() => {
									let temp = system.wild_decks[i + 1];
									system.wild_decks[i + 1] = deck;
									system.wild_decks[i] = temp;
								}}
							>
								&#9660
							</button>
						{:else}
							<button class="desactivate">&#9660</button>
						{/if}
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<div id="view">
	<View bind:system />
</div>

<style>
	#list {
		max-height: 80vh;
	}

	.preview {
		border-radius: 0;

		background-color: var(--deck_preview);
		background-image: var(--leather);

		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.preview:hover {
		background-color: var(--deck_preview_hover);
	}

	button.arrow {
		color: var(--link_hover);
	}

	button.arrow:hover {
		color: rgba(255, 255, 0, 1);
	}

	#view {
		position: fixed;
		top: 0;
		left: 54vw;
	}
</style>
