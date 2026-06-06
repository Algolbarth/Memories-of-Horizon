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
		card.useEffect(choice, target);
		game.use.reset();
	}
</script>

{#if choice == undefined}
	<div class="center">
		<button
			class="big choice"
			on:click={() => {
				choice = "radiation";
			}}
		>
			{#if card.owner().ressource("Mana").total() >= 25}
				Augmente de 20 la radiation d'une créature sur votre terrain
			{:else}
				Augmente de 10 la radiation d'une créature sur votre terrain
			{/if}
		</button>

		<br />

		<button
			class="big choice"
			on:click={() => {
				choice = "poison";
			}}
		>
			{#if card.owner().ressource("Mana").total() >= 25}
				Augmente de 5 le poison d'une créature sur le terrain adverse
				<br />
				Augmente de 30 la toxicité de cette créature
			{:else}
				Augmente de 5 le poison d'une créature sur le terrain adverse
				<br />
				Augmente de 10 la toxicité de cette créature
			{/if}
		</button>
	</div>
{:else if choice == "radiation"}
	<button
		class="square return margin-bottom"
		on:click={() => {
			choice = undefined;
		}}
	>
		↩
	</button>

	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Terrain")} {selectCondition} {selectAction} />
{:else if choice == "poison"}
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
