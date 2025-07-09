<script>
	import Zone from "../../../../Game/Zone.svelte";

	export let System;

	let choice = undefined;

	function condition(card) {
		return true;
	}

	function fonction(card) {
		System.game.use.card.useEffect(card);
		System.game.use.reset();
	}
</script>

{#if choice == undefined}
	<div class="center" style="text-align:center">
		<button
			class="big"
			on:click={() => {
				fonction(undefined);
			}}
		>
			Se place sur le terrain
		</button>

		<br />

		<button
			class="big"
			on:click={() => {
				choice = "damage";
			}}
		>
			Se détruis pour infliger 3 dégâts à une unité adverse sur le terrain
		</button>
	</div>
{:else}
	<button
		on:click={() => {
			choice = undefined;
		}}
	>
		Retour
	</button>
	<Zone
		bind:System
		entity={System.game.use.card.owner.adversary()}
		zone={System.game.use.card.owner.adversary().zone("Terrain")}
		{condition}
		{fonction}
	/>
{/if}
