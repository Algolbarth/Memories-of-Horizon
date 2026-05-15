<script lang="ts">
	import type { Game } from "$lib/game/class";
	import Zone from "$lib/game/zone.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";
	import { Creature } from "$lib/cards/class/creature";

	export let system: System;
	export let game: Game;
	export let card: Card;

	let creature_1: Creature | undefined;
	let creature_2: Creature | undefined;

	function selectCondition(target: Card) {
		if (target instanceof Creature && (creature_1 == undefined || target != creature_1)) {
			return true;
		}
		return false;
	}

	function selectAction_1(target: Creature) {
		creature_1 = target;
	}

	function selectAction_2(target: Creature) {
		creature_2 = target;

		card.useEffect(creature_1, creature_2);
		game.use.reset();
	}
</script>

{#if creature_1 == undefined}
	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Terrain")} {selectCondition} selectAction={selectAction_1} />
{:else}
	<button
		class="square return margin-bottom"
		on:click={() => {
			creature_1 = undefined;
		}}
	>
		↩
	</button>

	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Terrain")} {selectCondition} selectAction={selectAction_2} />
{/if}
