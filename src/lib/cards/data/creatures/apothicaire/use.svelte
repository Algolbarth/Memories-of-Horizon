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

	function selectCondition_1(target: Card) {
		if (target instanceof Creature) {
			return true;
		}
		return false;
	}

	function selectCondition_2(target: Card) {
		if (target instanceof Creature && target.stat("Poison").value() > 0) {
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
	<div class="center" style="text-align:center">
		<button
			class="big choice"
			on:click={() => {
				choice = "regeneration";
			}}
		>
			Augmente de 10 la régénération d'une créature sur votre terrain
		</button>

		<br />

		<button
			class="big choice"
			on:click={() => {
				choice = "toxicity";
			}}
		>
			Augmente de 10 la toxicité d'une créature empoisonnée sur le terrain adverse
		</button>
	</div>
{:else if choice == "regeneration"}
	<button
		class="square return margin-bottom"
		on:click={() => {
			choice = undefined;
		}}
	>
		↩
	</button>

	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Terrain")} selectCondition={selectCondition_1} {selectAction} />
{:else if choice == "toxicity"}
	<button
		class="square return margin-bottom"
		on:click={() => {
			choice = undefined;
		}}
	>
		↩
	</button>

	<Zone bind:system bind:game entity={card.adversary()} zone={card.adversary().zone("Terrain")} selectCondition={selectCondition_2} {selectAction} />
{/if}
