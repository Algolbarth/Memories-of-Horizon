<script lang="ts">
	import type { Game } from "$lib/game/class";
	import Zone from "$lib/game/zone.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";
	import { Item } from "$lib/cards/class/item";

	export let system: System;
	export let game: Game;
	export let card: Card;

	let potion_1: Item | undefined;
	let potion_2: Item | undefined;

	function selectCondition(target: Card) {
		if (target instanceof Item && target.isFamily("Potion") && (potion_1 == undefined || target != potion_1)) {
			return true;
		}
		return false;
	}

	function selectAction_1(target: Card) {
		potion_1 = target;
	}

	function selectAction_2(target: Card) {
		potion_2 = target;

		card.useEffect(potion_1, potion_2);
		game.use.reset();
	}
</script>

{#if potion_1 == undefined}
	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Inventaire")} {selectCondition} selectAction={selectAction_1} />
{:else}
	<button
		class="square return margin-bottom"
		on:click={() => {
			potion_1 = undefined;
		}}
	>
		↩
	</button>

	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Inventaire")} {selectCondition} selectAction={selectAction_2} />
{/if}
