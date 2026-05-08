<script lang="ts">
	import type { Game } from "$lib/game/class";
	import Zone from "$lib/game/zone.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";
	import { Creature } from "$lib/cards/class/creature";

	export let system: System;
	export let game: Game;
	export let card: Card;

	let choice: string | undefined = undefined;

	function selectCondition(target: Card) {
		if (target instanceof Creature) {
			return true;
		}
		return false;
	}

	function selectAction(target: Card) {
		card.useEffect(target, choice);
		game.use.reset();
	}
</script>

{#if choice == undefined}
	<div class="center">
		<button
			class="big choice"
			on:click={() => {
				choice = "strength";
			}}
		>
			Augmente de 100 la force d'une créature sur votre terrain
		</button>

		<br />

		<button
			class="big choice"
			on:click={() => {
				choice = "balance";
			}}
		>
			Augmente de 50 la constitution et la force d'une créature sur votre terrain
		</button>
	</div>
{:else}
	<button
		class="square return margin-bottom"
		on:click={() => {
			choice = undefined;
		}}
	>
		↩
	</button>

	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Terrain")} {selectCondition} {selectAction} />
{/if}
