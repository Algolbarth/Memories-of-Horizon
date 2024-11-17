<script>
	import Zone from '../../../Game/Zone.svelte';
	export let System;

	function condition(card) {
		if (card.type == "Créature" && card.elements.total().includes("Eau")) {
			return true;
		}
		return false;
	}

	function fonction(card) {
		System.game.use.card.useEffect(card);
		System.game.use.reset();
	}
</script>

<svelte:component
	this={Zone}
	{System}
	entity={System.game.use.card.owner}
	zone={System.game.use.card.owner.zone('Terrain')}
	{condition}
	{fonction}
/>
