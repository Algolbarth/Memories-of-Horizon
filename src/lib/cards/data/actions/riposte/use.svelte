<script lang="ts">
	import type { Game } from "$lib/game/class";
	import Zone from "$lib/game/zone.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";

	export let system: System;
	export let game: Game;
	export let card: Card;

	function selectCondition() {
		return true;
	}

	function selectAction(target: Card) {
		card.useEffect(target);
		game.use.reset();
	}
</script>

<Zone bind:system bind:game entity={card.adversary()} zone={card.adversary().zone("Terrain")} {selectCondition} {selectAction} />
