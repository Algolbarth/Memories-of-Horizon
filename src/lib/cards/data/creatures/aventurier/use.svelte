<script lang="ts">
	import type { Game } from "$lib/game/class";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";

	// svelte-ignore export_let_unused
	export let system: System;
	export let game: Game;
	export let card: Card;

	let types = ["action", "bâtiment", "créature", "lieu", "objet"];

	function selectAction(choice: string) {
		card.useEffect(choice);
		game.use.reset();
	}
</script>

<div class="center" style="text-align:center">
	{#each types as type}
		<button
			class="big choice"
			on:click={() => {
				selectAction(type.charAt(0).toUpperCase() + type.slice(1));
			}}
		>
			Pioche 1 {type}
		</button>

		<br />
	{/each}
</div>
