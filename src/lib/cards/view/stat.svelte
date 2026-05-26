<script lang="ts">
	import type { Card } from "../class/card";
	import { Unit } from "../class/unit";
	import Crit from "./crit.svelte";
	import Life from "./life.svelte";

	export let card: Card;
</script>

<div class="box">
	<span class="box_title">Statistiques</span>

	<br />

	<div class="container">
		{#if card instanceof Unit && card.checkStat("Constitution")}
			<Life bind:card />
		{/if}

		{#each card.stats as stat}
			{#if stat.display()}
				{#if stat.name == "Critique"}
					<Crit bind:card />
				{/if}

				<div class="row">
					<div>
						{stat.name}
					</div>

					<div style="text-align: right;">
						{#if stat.name == "Intensité"}
							x
						{/if}
						{stat.value()}
					</div>

					<div style="margin-left:0.5em;">
						{#if stat.name == "Critique"}
							%
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	div.container {
		display: grid;
	}

	div.row {
		display: grid;
		grid-template-columns: 10em 1fr 1fr 10em;
	}
</style>
