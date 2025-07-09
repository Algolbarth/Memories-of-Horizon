<script>
	export let System;
	export let entity;
</script>

<div id="player-info">
	Vie : {entity.life.current} / {entity.life.max}

	<br />

	{#each entity.ressources as ressource}
		{#if ressource.current > 0 || ressource.max > 0 || ressource.stock > 0}
			{ressource.name} : {ressource.current}
			{#if ressource.max > 0}
				/ {ressource.max}
			{/if}
			{#if ressource.stock > 0}
				+ {ressource.stock}
			{/if}
			<br />
		{/if}
	{/each}

	{#if entity.flux > 0}
		Flux : {entity.flux}
		{#if System.game.phase == "Préparation"}
			<br />
			<button
				on:click={() => {
					System.game.flux = true;
				}}
			>
				Transformer le flux
			</button>
		{/if}
		<br />
	{/if}

	{#if System.settings.show_intelligence}
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
