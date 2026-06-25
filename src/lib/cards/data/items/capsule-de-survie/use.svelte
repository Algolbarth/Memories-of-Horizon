<script lang="ts">
	import type { Game } from "$lib/game/class";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/card";

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
			selectAction("stockage");
		}}
	>
		Stocke 1 flux
	</button>

	<br />

	<button
		class="big choice"
		on:click={() => {
			selectAction("draw");
		}}
	>
		Pioche 1 créature
		<br />
		Réduis de 35 le coût de cette créature
	</button>
</div>
