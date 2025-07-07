<script>
	import Zone from '../../../Game/Zone.svelte';

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
	bind:entity={System.game.use.card.owner}
	zone={System.game.use.card.owner.zone('Défausse')}
	{condition}
	{fonction}
/>
