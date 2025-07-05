<script>
	import Info from '../../Info.svelte';

	export let System;
	export let card;
</script>

Crée un <Info bind:System name={"Élémentaire de caillou"} /> sur le terrain OU créé un <Info bind:System name={"Mur de roche"} /> sur le terrain.
<br />
<br />
Sorcellerie 50 : crée les deux sur le terrain à la place.
