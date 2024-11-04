<script>
	import Zone from '../../../Game/Zone.svelte';
	export let System;
	System;

	let choice = undefined;

	function condition() {
		return true;
	}

	function fonction(card) {
		System.game.use.card.useEffect(card);
		System.game.use.reset();
	}
</script>

{#if choice == undefined}
	<div class="center">
		<button
			class="big"
			on:click={() => {
				fonction(undefined);
			}}>Augmente de 2 la capacité en feu</button
		>
		<br />
		<button
			class="big"
			on:click={() => {
				choice = 'damage';
			}}>Inflige 20 dégâts à une unité adverse sur le terrain</button
		>
	</div>
{:else if choice == 'damage'}
	<button
		
		on:click={() => {
			choice = undefined;
		}}>Retour</button
	>
	<svelte:component
		this={Zone}
		{System}
		entity={System.game.use.card.owner.adversary()}
		zone={System.game.use.card.owner.adversary().zone('Terrain')}
		{condition}
		{fonction}
	/>
{/if}
