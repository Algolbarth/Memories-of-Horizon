<script>
	export let card;
</script>

<div class="box">
	<i>Traits</i>
	<br />

	{#if card.trait('Légendaire').value()}
		Légendaire
		<br />
	{/if}

	{#if card.trait('Rare').value()}
		Rare
		<br />
	{/if}

	{#if card.isUnit() && card.trait('Inactif').value()}
		Inactif
		<br />
	{/if}
</div>
