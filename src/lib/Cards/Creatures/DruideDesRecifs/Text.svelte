<script>
	import Info from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé, au choix : se transforme en <Info bind:System name={"Druide des récifs (forme ondin)"} /> OU se transforme en <Info bind:System name={"Druide des récifs (forme tortue)"} />.
<br />
{#if card.name == 'Druide des récifs (forme ondin)'}
	Au début de la phase de préparation : augmente de 1 la capacité en eau.
{/if}
