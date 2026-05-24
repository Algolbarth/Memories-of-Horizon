<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { TrainEntity } from "./train";

	export let system: System;
	export let entity: TrainEntity;

	let life: number = entity.life;
	let gold: number = entity.gold;
	let flux: number = entity.flux;
	let mana: number = entity.mana;
</script>

<div class={"zone " + (entity == system.train.player ? "left" : "right")}>
	<div class={"preview deck " + entity.deck.mode}>
		<div>{entity.deck.name}</div>

		<div style="text-align:right;margin-right:0.5em">
			<button
				on:click={() => {
					system.view.reset();
					system.train.add.entity = entity;
					system = system;
				}}
			>
				Changer
			</button>
		</div>
	</div>

	<div class="preview life">
		<div>Santé</div>
		<div style="text-align:right;margin-right:0.5em">
			<input
				type="number"
				min="1"
				bind:value={life}
				on:change={() => {
					if (life < 1) {
						life = 1;
					} else {
						entity.life = life;
					}
				}}
			/>
		</div>
		<div>/ 100</div>
	</div>

	<div class="preview" style={"background:" + system.ressources.find("Or")?.color + ";color:" + (system.ressources.find("Or")?.light_font ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")}>
		<div>Or</div>
		<div>{gold}</div>
		<div>
			/
			<input
				type="number"
				min="0"
				bind:value={gold}
				on:change={() => {
					if (gold < 0) {
						gold = 0;
					} else {
						entity.gold = gold;
					}
				}}
			/>
		</div>
	</div>

	<div class="preview" style={"background:" + system.ressources.find("Flux")?.color + ";color:" + (system.ressources.find("Flux")?.light_font ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")}>
		<div>Flux</div>

		<div></div>
		<div></div>

		<div>
			<input
				type="number"
				min="0"
				bind:value={flux}
				on:change={() => {
					if (flux < 0) {
						flux = 0;
					} else {
						entity.flux = flux;
					}
				}}
			/>
		</div>
	</div>

	<div class="preview" style={"background:" + system.ressources.find("Mana")?.color + ";color:" + (system.ressources.find("Mana")?.light_font ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")}>
		<div>Mana</div>

		<div></div>
		<div></div>

		<div>
			<input
				type="number"
				min="0"
				bind:value={mana}
				on:change={() => {
					if (mana < 0) {
						mana = 0;
					} else {
						entity.mana = mana;
					}
				}}
			/>
		</div>
	</div>
</div>

<style>
	.zone {
		margin-bottom: 1vw;
	}

	.left {
		margin-right: 0.5vw;
	}

	.right {
		margin-left: 0.5vw;
	}

	div.preview {
		border-color: black;
		border-radius: 0;

		display: grid;
		grid-template-columns: 1fr 3em 4em 8em 3em 2fr;
	}

	div.life {
		background: var(--life);
	}

	div.life:hover {
		background: var(--life);
	}

	div.deck {
		transition: none;
		border-radius: 0;
		background-image: var(--leather);
		grid-template-columns: 1fr 1fr;

		&.standard {
			background-color: rgb(150, 75, 0);
		}

		&.wild {
			background-color: rgb(100, 50, 0);
		}

		&.train {
			background-color: rgb(110, 0, 0);
		}
	}

	input[type="number"] {
		width: 3em;
	}
</style>
