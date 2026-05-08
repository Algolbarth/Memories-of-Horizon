<script lang="ts">
	import type { Game } from "$lib/game/class";
	import Zone from "$lib/game/zone.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";
	import { Creature } from "$lib/cards/class/creature";
	import type { Stat } from "$lib/cards/class/stat";

	export let system: System;
	export let game: Game;
	export let card: Card;

	let choice: Creature | undefined = undefined;

	function selectCondition(target: Card) {
		if (target instanceof Creature && (target.isDamaged() || target.hasDebuff())) {
			return true;
		}
		return false;
	}

	function selectAction_1(target: Creature) {
		if (target.isDamaged()) {
			card.useEffect(target);
			game.use.reset();
		} else {
			choice = target;
		}
	}

	function selectAction_2(stat: Stat) {
		card.useEffect(choice, stat);
		game.use.reset();
	}
</script>

{#if choice == undefined}
	<Zone bind:system bind:game entity={card.owner()} zone={card.owner().zone("Terrain")} {selectCondition} selectAction={selectAction_1} />
{:else}
	<button
		class="square return margin-bottom"
		on:click={() => {
			choice = undefined;
		}}
	>
		↩
	</button>

	<div class="center" style="text-align:center">
		{#each choice.stats as stat}
			{#if stat.debuff && stat.condition()}
				<button
					class="big choice"
					on:click={() => {
						selectAction_2(stat);
					}}
				>
					{stat.name}
				</button>

				<br />
			{/if}
		{/each}
	</div>
{/if}
