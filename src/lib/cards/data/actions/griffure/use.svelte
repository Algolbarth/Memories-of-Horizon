<script lang="ts">
	import type { Game } from "$lib/game/class";
	import Zone from "$lib/game/zone.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";
	import { Creature } from "$lib/cards/class/creature";
	import type { Unit } from "$lib/cards/class/unit";

	export let system: System;
	export let game: Game;
	export let card: Card;

	let ally: Creature | undefined = undefined;
	let opponent: Unit | undefined = undefined;

	function selectCondition_1(target: Card) {
		if (target instanceof Creature) {
			return true;
		}
		return false;
	}

	function selectCondition_2(target: Card) {
		return true;
	}

	function selectAction_1(target: Creature) {
		ally = target;
	}

	function selectAction_2(target: Unit) {
		opponent = target;
		card.useEffect(ally, opponent);
		game.use.reset();
	}
</script>

{#if ally == undefined}
	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Terrain")} selectCondition={selectCondition_1} selectAction={selectAction_1} />
{:else}
	<Zone bind:system bind:game entity={card.adversary()} zone={card.adversary().zone("Terrain")} selectCondition={selectCondition_2} selectAction={selectAction_2} />
{/if}
