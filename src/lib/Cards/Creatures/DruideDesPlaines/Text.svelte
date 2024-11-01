<script>
	import Info from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé, au choix : se transforme en <Info bind:System name={"Druide des plaines (forme humain)"} /> OU se transforme en
<Info bind:System name={"Druide des plaines (forme loup)"} />.
<br />
{#if card.name == 'Druide des plaines (forme humain)'}
	Au début de la phase de préparation : pioche 2 cartes.
{/if}
