<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Card } from "../class/card";

	// svelte-ignore export_let_unused
	export let system: System;
	// svelte-ignore export_let_unused
	export let card: Card;

	function costs(card: Card) {
		let tab = [];
		for (const cost of card.cost) {
			if (cost.value() > 0) {
				tab.push(cost);
			}
		}
		return tab;
	}

	function sales(card: Card) {
		let tab = [];
		for (const sale of card.sale) {
			if (sale.value() > 0) {
				tab.push(sale);
			}
		}
		return tab;
	}
</script>

<div class="box">
	{card.name}
</div>

<div class="container box">
	<div class="cost" style="background-color:rgba(150, 100, 0, 1);">
		Nv {card.level}
	</div>
	{#each card.elements.total() as element}
		<div class="cost" style={"background-color:" + system.ressources.find("", element)?.color + ";color:" + (system.ressources.find("", element)?.light_font ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")}>
			{element}
		</div>
	{/each}
</div>

{#if costs(card).length > 0 || sales(card).length > 0}
	<div class="box">
		<div class="container">
			{#if costs(card).length > 0}
				{#each costs(card) as cost}
					<div class="cost" style={"background-color:" + system.ressources.find(cost.name)?.color + ";color:" + (system.ressources.find(cost.name)?.light_font ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")}>
						{cost.value()}
					</div>
				{/each}
			{:else}
				<div class="cost" style="background-color:transparent;">Rien</div>
			{/if}
		</div>

		<hr />

		<div class="container">
			{#if sales(card).length > 0}
				{#each sales(card) as sell, i}
					<div class="cost" style={"background-color:" + system.ressources.find(sell.name)?.color + ";color:" + (system.ressources.find(sell.name)?.light_font ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")}>
						{sell.value()}
					</div>
				{/each}
			{:else}
				<div class="cost" style="background-color:transparent;">Rien</div>
			{/if}
		</div>
	</div>
{/if}

<div class="box">
	{card.type}
	{#if card.families.total().length > 0}
		-
		{#each card.families.total() as family, i}
			{#if i > 0}<div class="space"></div>{/if}{family}
		{/each}
	{/if}
</div>

<style>
	div.container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
	}

	div.cost {
		display: inline;
		padding: 0.2em;
		margin-right: 0.5em;

		border: solid;
		border-color: black;
		border-width: 0.2vmin;
		border-radius: 5px;

		background-image: var(--paper);
	}

	hr {
		border: none;
		border-top: 6px double #000000;
	}

	div.space {
		display: inline-block;
		width: 0.34em;
	}
</style>
