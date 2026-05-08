<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Game } from "./class";

	export let system: System;
	export let game: Game;

	function close() {
		game.use.reset();
	}
</script>

<div class="window">
	<div class="body">
		<button
			class="square close"
			on:click={() => {
				close();
			}}
		>
			X
		</button>

		<br />
		<br />

		<div class="side">
			<svelte:component this={game.use.svelte} bind:system bind:game bind:card={game.use.card} />
		</div>
	</div>
</div>
