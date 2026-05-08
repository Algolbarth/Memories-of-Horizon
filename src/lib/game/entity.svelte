<script lang="ts">
	import type { System } from "$lib/system/class";
	import { several } from "../utils";
	import type { Entity } from "./entity";
	import type { Game } from "./class";

	export let system: System;
	export let game: Game;
	export let entity: Entity;
	export let direction: string;
	export let show_flux: boolean;
</script>

<div class={"zone " + direction}>
	<div class="preview life">
		<div>Santé</div>
		<div style="text-align:right;margin-right:0.5em">
			{entity.life.current}
		</div>
		<div>
			/ {entity.life.max}
		</div>
	</div>

	{#each entity.ressources as ressource}
		{#if ressource.current > 0 || ressource.production > 0 || ressource.stockage > 0}
			<div class="preview" style={"background:" + system.ressources.find(ressource.name)?.color + ";color:" + (system.ressources.find(ressource.name)?.light_font ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")}>
				<div>
					{ressource.name}
				</div>
				<div style="text-align:right;margin-right:0.5em">
					{#if ressource.current > 0 || ressource.production > 0}
						{ressource.current}
					{/if}
				</div>
				<div>
					{#if ressource.production > 0}
						/ {ressource.production}
					{/if}
				</div>
				<div>
					{#if ressource.stockage > 0}
						{#if ressource.current > 0 || ressource.production > 0}+
						{/if}{several(ressource.stockage, ["stocké"])}
					{/if}
				</div>
				<div>
					{#if ressource.stockage > 0 && ressource.current > 0}
						= {ressource.current + ressource.stockage}
					{/if}
				</div>
				<div style="text-align:right">
					{#if ressource.name == "Flux" && ressource.stockage > 0 && game.phase == "Préparation"}
						<button
							on:click={() => {
								show_flux = true;
							}}
						>
							Convertir
						</button>
					{/if}
				</div>
			</div>
		{/if}
	{/each}

	{#if system.settings.show_intelligence}
		<div class="preview stat">
			<div>Intelligence</div>
			<div style="text-align:right;margin-right:0.5em">
				{entity.totalIntelligence()}
			</div>
		</div>
	{/if}
</div>

<style>
	.zone {
		margin-bottom: 1vw;
		text-align: left;
	}

	.left {
		margin-right: 0.5vw;
	}

	.right {
		margin-left: 0.5vw;
	}

	div.life {
		background: var(--life);
	}

	div.stat {
		background: var(--background);
	}

	div.preview {
		border-color: black;
		border-radius: 0;

		display: grid;
		grid-template-columns: 1fr 3em 4em 8em 3em 2fr;
	}
</style>
