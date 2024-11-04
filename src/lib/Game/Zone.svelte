<script>
	import Preview from './Preview.svelte';
	
	export let System;
	export let zone;
	export let entity;
	export let condition;
	export let fonction;
</script>

<div id="body">
	{zone.name}
	{#if zone.name == 'Boutique'}
		Nv {zone.level}
	{/if}
	{#if zone.name != 'Défausse'}
		- ({zone.cards.length} / {zone.size})
	{/if}
	{#if zone.name == 'Boutique'}
		{#if entity == System.game.player && fonction == undefined && System.game.phase == 'Préparation'}
			-
			<button
				
				on:click={() => {
					entity.actualiseShop();
				}}>Actualiser</button
			>
			{10} Or
		{/if}
		{#if entity == System.game.player && zone.level < 20 && fonction == undefined && System.game.phase == 'Préparation'}
			-
			<button
				
				on:click={() => {
					entity.upShop();
				}}>Améliorer</button
			>
			{zone.level * 10} Or
		{/if}
		{#if entity == System.game.player && fonction == undefined && System.game.phase == 'Préparation'}
			-
			<button
				
				on:click={() => {
					entity.lock();
				}}>Verrouiller</button
			>
		{/if}
	{/if}
	<div id="list">
		{#if zone.cards.length > 0}
			{#each zone.cards as card}
				<svelte:component this={Preview} {System} {card} {condition} {fonction} />
			{/each}
		{:else}
			<i>Vide</i>
			<br />
		{/if}
	</div>
</div>

<style>
	#body {
		background-color: var(--zone);
		border: solid;
		margin: 1%;
		padding: 1%;
	}
</style>
