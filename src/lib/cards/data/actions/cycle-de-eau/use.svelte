<script lang="ts">
	import type { Game } from "$lib/game/class";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";

	// svelte-ignore export_let_unused
	export let system: System;
	export let game: Game;
	export let card: Card;

	function selectAction(choice: string) {
		card.useEffect(choice);
		game.use.reset();
	}
</script>

<div class="center" style="text-align:center">
	<button
		class="big choice"
		on:click={() => {
			selectAction("Pile");
		}}
	>
		Augmente de 1 la taille de votre pile.
	</button>

	<br />

	<button
		class="big choice"
		on:click={() => {
			selectAction("Inventaire");
		}}
	>
		Augmente de 1 la taille de votre inventaire.
	</button>

	<br />

	<button
		class="big choice"
		on:click={() => {
			selectAction("Terrain");
		}}
	>
		Augmente de 1 la taille de votre terrain.
	</button>
</div>
