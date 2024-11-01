<script>
	import Info from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé, au choix : se transforme en <Info bind:System name={"Druide des montagnes (forme nain)"} /> OU se transforme en <Info bind:System name={"Druide des montagnes (forme ours)"} />.
<br />
{#if card.name == 'Druide des montagnes (forme nain)'}
	Au début de la phase de préparation : augmente son attaque et sa vie de 10.
{/if}
