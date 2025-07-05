<script>
	import CardInfo from '../../Info.svelte';

	export let System;
	export let card;
</script>

Quand posé : inflige autant de dégâts que possible à une unité adverse et dépense autant d'or.
<br />
Quand meurt : se transforme en <CardInfo bind:System name={"Chevalier noir"} />, se soigne toutes ses blessures et reste sur le terrain.