<script>
	import Zone from '../../../../Game/Zone.svelte';

	export let System;

	function condition(card) {
		if (card.type == 'Objet' && card.familles.total().includes('Nourriture')) {
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
	zone={System.game.use.card.owner.zone('Main')}
	{condition}
	{fonction}
/>
