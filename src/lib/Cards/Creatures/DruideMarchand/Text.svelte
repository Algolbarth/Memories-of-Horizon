<script>
	import Info from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé, au choix : se transforme en <Info bind:System name={"Druide marchand (forme humain)"} /> OU se transforme en <Info bind:System name={"Druide marchand (forme boeuf)"} />.
<br />
{#if card.name == 'Druide marchand (forme humain)'}
	Au début de la phase de préparation : augmente de 1 la capacité en or.
{/if}
