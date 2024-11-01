<script>
	import Info from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé, au choix : se transforme en <Info bind:System name={"Druide des bois (forme elfe)"} /> OU se transforme en <Info bind:System name={"Druide des bois (forme renard)"} />.
<br />
{#if card.name == 'Druide des bois (forme elfe)'}
	Quand une action alliée est jouée : augmente de 3 sa vie.
{/if}
