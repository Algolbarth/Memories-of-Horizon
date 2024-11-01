<script>
	export let System;
	export let entity;
</script>

<div id="player-info">
	Vie : {entity.life.current} / {entity.life.max}

	<br />

	{#if System.game.phase == 'Préparation'}
		{#each entity.ressources as ressource}
			{#if ressource.current > 0 || ressource.max > 0 || ressource.stock > 0}
				{ressource.name} : {ressource.current} / {ressource.max}
				{#if ressource.stock > 0}
					+ {ressource.stock}
				{/if}
				<br />
			{/if}
		{/each}
		{#if entity == System.game.player && entity.flux > 0}
			Flux : {entity.flux}
			<br />
			<button
				class="classic"
				on:click={() => {
					System.game.flux = true;
					System.pages.change('Game');
				}}>Gérer les éléments</button
			>
			<br />
		{/if}
	{/if}

	{#if System.show_intelligence}
		Intelligence : {entity.totalIntelligence()}
	{/if}
</div>

<style>
	#player-info {
		background-color: var(--zone);
		border: solid;
		margin: 1%;
		padding: 1%;
	}
</style>
