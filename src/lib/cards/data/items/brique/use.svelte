<script lang="ts">
	import type { Game } from "$lib/game/class";
	import Zone from "$lib/game/zone.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";
	import { Building } from "$lib/cards/class/building";

	export let system: System;
	export let game: Game;
	export let card: Card;

	let choice: string | undefined = undefined;

	function selectCondition_1(target: Card) {
		if (target instanceof Building) {
			return true;
		}
		return false;
	}

	function selectCondition_2() {
		return true;
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
				choice = "heal";
			}}
		>
			Soigne 20 blessures à un bâtiment sur votre terrain
		</button>

		<br />

		<button
			class="big"
			on:click={() => {
				choice = "damage";
			}}
		>
			Inflige 20 dégâts spéciaux à une unité sur le terrain adverse
		</button>
	</div>
{:else if choice == "heal"}
	<button
		class="square return margin-bottom"
		on:click={() => {
			choice = undefined;
		}}
	>
		↩
	</button>

	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Terrain")} selectCondition={selectCondition_1} {selectAction} />
{:else if choice == "damage"}
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
