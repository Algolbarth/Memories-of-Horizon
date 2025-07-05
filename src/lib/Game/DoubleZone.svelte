<script>
	import Zone from './Zone.svelte';
	export let System;
	export let zone;
</script>

<div class="zones">
	<svelte:component
		this={Zone}
		{System}
		entity={System.game.player}
		zone={System.game.player.zone(zone)}
		condition={undefined}
		fonction={undefined}
	/>
	<div style="text-align:right;">
		<svelte:component
			this={Zone}
			{System}
			entity={System.game.bot}
			zone={System.game.bot.zone(zone)}
			condition={undefined}
			fonction={undefined}
		/>
	</div>
</div>

<style>
	.zones {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
