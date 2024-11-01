<script>
	import Info from '../../Info.svelte';

	export let System;
	export let card;
</script>

Crée un <Info bind:System name={"Élémentaire de roche"} /> sur le terrain OU créé un <Info bind:System name={"Mur de roche"} /> sur le terrain. Dépense 50 mana
pour créer les deux sur le terrain à la place.
