<script>
	import CardInfo from '../../../Info.svelte';

	export let System;
	export let card;
</script>

Quand une carte alliée de famille Sort est posée : crée un <CardInfo
	bind:System
	name={'Élémentaire de caillou'}
/> dans la main.
