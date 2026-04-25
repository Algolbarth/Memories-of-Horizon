<script lang="ts">
	import type { Game } from "$lib/game/class";
	import Zone from "$lib/game/zone.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";
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

	function selectAction(target: Card | undefined) {
		card.useEffect(choice, target);
		game.use.reset();
	}
</script>

{#if choice == undefined}
	<div class="center">
		<button
			class="big choice"
			on:click={() => {
				choice = "creature";
				selectAction(undefined);
			}}
		>
			Se place sur votre terrain
		</button>

		<br />

		<button
			class="big choice"
			on:click={() => {
				choice = "effect";
			}}
		>
			Augmente jusqu'à 1 l'étourdissement d'une créature sur le terrain adverse
			<br />
			Se détruit
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

	<Zone bind:system bind:game entity={card.adversary()} zone={card.adversary().zone("Terrain")} {selectCondition} {selectAction} />
{/if}
