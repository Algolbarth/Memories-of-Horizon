<script>
	import Zone from "../../../../Game/Zone.svelte";

	export let System;

	function condition(card) {
		if (card.type == "Créature") {
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

<Zone
	bind:System
	entity={System.game.use.card.owner.adversary()}
	zone={System.game.use.card.owner.adversary().zone("Terrain")}
	{condition}
	{fonction}
/>
