<script lang="ts">
	import type { System } from "$lib/system/class";
	import { Card } from "../class/class";
	import { Unit } from "../class/unit";
	import { Creature } from "../class/creature";
	import { Equipment } from "../class/equipment";
	import Caracteristics from "./caracteristics.svelte";
	import Description from "./description.svelte";
	import Effet from "./effect.svelte";
	import Equipments from "./equipments.svelte";
	import EquipStat from "./equip-stat.svelte";
	import EquipTrait from "./equip-trait.svelte";
	import Stat from "./stat.svelte";
	import Trait from "./trait.svelte";

	export let system: System;

	$: card = system.view.quick == undefined ? system.view.card : system.view.quick;

	function close() {
		system.view.card = undefined;
		system = system;
	}
</script>

{#if card != undefined && card instanceof Card}
	<div id="shadow">
		<div id="body">
			<div id="content">
				<div style="text-align:right;">
					<button
						class="square close seal"
						on:click={() => {
							close();
						}}
					>
						X
					</button>
				</div>

				<div style="max-height: 80vh;" class="scroll">
					<Caracteristics bind:card bind:system />
					{#if card.effects.length > 0}
						<Effet bind:card bind:system />
					{/if}

					{#if card.displayTrait() || card.alternative_form != undefined}
						<Trait bind:system bind:card />
					{/if}
					{#if card instanceof Unit || card.displayStat()}
						<Stat bind:card />
					{/if}

					{#if card instanceof Creature}
						<Equipments bind:card bind:system />
					{/if}

					{#if card instanceof Equipment && card.displayEquipTrait()}
						<EquipTrait bind:card />
					{/if}
					{#if card instanceof Equipment && card.displayEquipStat()}
						<EquipStat bind:card />
					{/if}

					{#if system.settings.show_card_description}
						<br />
						<hr />

						<Description bind:card />
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	#shadow {
		width: 40vw;
		height: 90vh;
		margin: 2.5vh;
	}

	#shadow::before {
		content: "";

		position: absolute;
		z-index: -1;

		width: 40vw;
		height: 90vh;

		border: solid;
		border-width: 0.75vmin;
		border-radius: 20px;

		box-shadow: 0px 15px 15px rgba(0, 0, 0, 1);
		opacity: 0;

		transition: opacity 0.5s ease-in-out;
	}

	#shadow:hover::before {
		transition: opacity 0.5s ease-in-out;
		opacity: 1;
	}

	#body {
		position: relative;
		display: inline-block;

		border: solid;
		border-width: 1vmin;
		border-radius: 20px;

		width: 100%;
		height: 100%;

		background-color: var(--card);
		background-image: var(--paper);
		box-shadow: 0 0.2vmin 0.2vmin rgba(0, 0, 0, 1);
		transition: all 0.5s ease-in-out;
	}

	#body:hover {
		transition: all 1s ease-in-out;
		box-shadow: none;
	}

	#content {
		padding: 2%;
		display: grid;
		grid-template-rows: auto 1fr;
	}

	hr {
		overflow: visible;
		padding: 0;
		margin: 0;
		border: none;
		border-top: medium double black;
		border-width: 0.5em;
		text-align: center;
		box-shadow: inset 0 1em 1em -1em rgba(0, 0, 0, 0.3);
	}

	hr:after {
		content: "§";
		display: inline-block;
		position: relative;
		top: -0.9em;
		font-size: 1.5em;
		padding: 0 0.25em;
		background: var(--card);
		background-image: var(--paper);
	}

	button.close {
		margin: 0 0 0.25em 0;
	}
</style>
