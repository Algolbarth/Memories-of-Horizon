<script lang="ts">
	import type { Game } from "$lib/game/class";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";

	// svelte-ignore export_let_unused
	export let system: System;
	export let game: Game;
	export let card: Card;

	function selectAction(choice: string) {
		card.useEffect(choice);
		game.use.reset();
	}
</script>

<div class="center">
	<button
		class="big choice"
		on:click={() => {
			selectAction("draw");
		}}
	>
		Pioche 1 carte pour chaque lieu dans votre région.
	</button>

	<br />

	<button
		class="big choice"
		on:click={() => {
			selectAction("location");
		}}
	>
		Pioche 1 lieu
	</button>
</div>
