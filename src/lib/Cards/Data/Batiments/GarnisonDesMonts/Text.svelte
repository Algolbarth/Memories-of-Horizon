<script>
	import CardInfo from "../../../Info.svelte";

	export let System;
	export let card;
</script>

Au début d'un tour de combat : crée <CardInfo
	bind:System
	name={"Soldat nain"}
/> sur le terrain.
