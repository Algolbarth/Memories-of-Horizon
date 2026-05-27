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
		if (target instanceof Creature && target.isFamily("Bête")) {
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
				choice = "destroy";
			}}
		>
			Détruit une créature de famille Bête sur votre terrain
		</button>

		<br />

		<button
			class="big choice"
			on:click={() => {
				choice = "production";
				selectAction(undefined);
			}}
		>
			Produit 1 or pour chaque créature de famille Bête dans votre défausse
		</button>
	</div>
{:else if choice == "destroy"}
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
