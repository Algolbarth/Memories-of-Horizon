<script lang="ts">
	import type { Game } from "$lib/game/class";
	import Zone from "$lib/game/zone.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";

	export let system: System;
	export let game: Game;
	export let card: Card;

	let choice: string | undefined = undefined;

	function selectCondition(target: Card) {
		return true;
	}

	function selectAction(target: Card) {
		card.useEffect(choice, target);
		game.use.reset();
	}
</script>

{#if choice == undefined}
	<div class="center">
		<button
			class="big choice"
			on:click={() => {
				choice = "thorn";
			}}
		>
			{#if card.owner().ressource("Mana").total() >= 25}
				Augmente de 20 l'épine d'une unité sur votre terrain
			{:else}
				Augmente de 10 l'épine d'une unité sur votre terrain
			{/if}
		</button>

		<br />

		<button
			class="big choice"
			on:click={() => {
				choice = "damage";
			}}
		>
			{#if card.owner().ressource("Mana").total() >= 25}
				Inflige 100 dégâts à une unité sur le terrain adverse
			{:else}
				Inflige 50 dégâts à une unité sur le terrain adverse
			{/if}
		</button>
	</div>
{:else if choice == "thorn"}
	<button
		class="square return margin-bottom"
		on:click={() => {
			choice = undefined;
		}}
	>
		↩
	</button>

	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Terrain")} {selectCondition} {selectAction} />
{:else if choice == "damage"}
	<button
		class="square return margin-bottom"
		on:click={() => {
			choice = undefined;
		}}
	>
		↩
	</button>

	<Zone bind:system bind:game entity={card.adversary()} zone={card.adversary().zone("Terrain")} {selectCondition} {selectAction} />
{/if}
