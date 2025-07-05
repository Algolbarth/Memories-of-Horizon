<script>
	import Info from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé : choisit un objet allié de famille Nourriture dans la main.
<br />
<br />
Au début d'une étape de préparation : crée un objet de même nom que l'objet choisi.

{#if card.product != undefined}
	<br />
	<br />

	Objet choisi : <Info bind:System name={card.product} />
{/if}
