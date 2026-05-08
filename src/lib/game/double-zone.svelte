<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Game } from "./class";
	import Zone from "./zone.svelte";

	export let system: System;
	export let game: Game;
	export let zone: string;
</script>

<div class="zones">
	<Zone bind:system bind:game bind:entity={game.player} zone={game.player.zone(zone)} selectCondition={undefined} selectAction={undefined} direction={"left"} />
	<div style="text-align:right;">
		<Zone bind:system bind:game bind:entity={game.bot} zone={game.bot.zone(zone)} selectCondition={undefined} selectAction={undefined} direction={"right"} />
	</div>
</div>

<style>
	.zones {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
