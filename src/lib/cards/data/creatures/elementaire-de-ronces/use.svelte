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

<div class="center" style="text-align:center">
	<button
		class="big choice"
		on:click={() => {
			selectAction("battlefield");
		}}
	>
		Se place sur votre terrain.
	</button>

	<br />

	<button
		class="big choice"
		on:click={() => {
			selectAction("stack");
		}}
	>
		Éveil : Augmente de 75 sa constitution.
		<br />
		Augmente de 10 son épine.
	</button>
</div>
