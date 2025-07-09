<script>
	import CardInfo from '../../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé, au choix :
<ul>
	<li>Se transforme en <CardInfo bind:System name={'Druide de feu (forme gobelin)'} />.</li>
	<li>Se transforme en <CardInfo bind:System name={'Druide de feu (forme lézard)'} />.</li>
</ul>

{#if card.name == 'Druide de feu (forme gobelin)'}
	Au début de la phase de préparation : augmente son attaque de 10.
{/if}
