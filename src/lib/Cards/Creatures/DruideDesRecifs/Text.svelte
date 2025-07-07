<script>
	import CardInfo from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé, au choix :
<ul>
	<li>Se transforme en <CardInfo bind:System name={'Druide des récifs (forme ondin)'} />.</li>
	<li>Se transforme en <CardInfo bind:System name={'Druide des récifs (forme tortue)'} />.</li>
</ul>

{#if card.name == 'Druide des récifs (forme ondin)'}
	Au début de la phase de préparation : augmente de 1 la capacité en eau.
{/if}
