<script>
	import CardInfo from '../../../Info.svelte';

	export let System;
	export let card;
</script>

Quand <CardInfo bind:System name={'Boule de feu'} /> est posée : crée <CardInfo
	bind:System
	name={'Boule de feu'}
/> dans la boutique.
