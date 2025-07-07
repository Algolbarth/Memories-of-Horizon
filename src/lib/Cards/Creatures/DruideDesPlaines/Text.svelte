<script>
	import CardInfo from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé, au choix :
<ul>
	<li>Se transforme en <CardInfo bind:System name={'Druide des plaines (forme humain)'} />.</li>
	<li>Se transforme en <CardInfo bind:System name={'Druide des plaines (forme loup)'} />.</li>
</ul>

{#if card.name == 'Druide des plaines (forme humain)'}
	Au début de la phase de préparation : pioche 2 cartes.
{/if}
