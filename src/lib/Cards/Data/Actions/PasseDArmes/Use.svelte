<script>
	import Zone from "../../../../Game/Zone.svelte";
	export let System;

	function condition(card) {
		if (card.type == "Créature" && card.equipments.length > 0) {
			return true;
		}
		return false;
	}

	function fonction(card) {
		System.game.use.card.useEffect(card);
		System.game.use.reset();
	}
</script>

<Zone
	bind:System
	bind:entity={System.game.use.card.owner}
	zone={System.game.use.card.owner.zone("Terrain")}
	{condition}
	{fonction}
/>
