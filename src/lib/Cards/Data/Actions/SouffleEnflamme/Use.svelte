<script>
	import Zone from '../../../../Game/Zone.svelte';

	export let System;

	function condition(card) {
		return true;
	}

	function fonction(card) {
		System.game.use.card.useEffect(card);
		System.game.use.reset();
	}
</script>

<Zone
	bind:System
	entity={System.game.use.card.owner.adversary()}
	zone={System.game.use.card.owner.adversary().zone('Terrain')}
	{condition}
	{fonction}
/>
