<script>
	import Info from '../../Info.svelte';

	export let System;
	export let card;
</script>

Au choix :
<ul>
	<li>Crée un <Info bind:System name={"Élémentaire de caillou"} /> sur le terrain.</li>
	<li>Créé un <Info bind:System name={"Mur de roche"} /> sur le terrain.</li>
</ul>

Sorcellerie 50 : crée les deux sur le terrain à la place.
