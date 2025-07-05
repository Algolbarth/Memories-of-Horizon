<script>
	import CardInfo from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé : crée 2 <CardInfo bind:System name={'Chien'} /> sur le terrain.
<br />
<br />
Au début de la phase de préparation : crée <CardInfo bind:System name={'Chien'} /> sur le terrain.
