<script>
	export let card;

	function cout(c) {
		let tab = [];
		for (const cost of c.cout) {
			if (cost.value() > 0) {
				tab.push(cost);
			}
		}
		return tab;
	}

	function vente(c) {
		let tab = [];
		for (const sell of c.vente) {
			if (sell.value() > 0) {
				tab.push(sell);
			}
		}
		return tab;
	}
</script>

<div class="box">
	{card.name}
</div>

<div class="box">
	Nv {card.level}
	-
	{#each card.elements as element, i}
		{#if i > 0}
			&nbsp
		{/if}
		{element}
	{/each}
</div>

{#if cout(card).length > 0 || vente(card).length > 0}
	<div class="box">
		{#if cout(card).length > 0}
			{#each cout(card) as cost, i}
				{#if i > 0}
					&nbsp
				{/if}
				{cost.name} : {cost.value()}
			{/each}
		{:else}
			<i>Rien</i>
		{/if}
		<hr />
		{#if vente(card).length > 0}
			{#each vente(card) as sell, i}
				{#if i > 0}
					&nbsp
				{/if}
				{sell.name} : {sell.value()}
			{/each}
		{:else}
			<i>Rien</i>
		{/if}
	</div>
{/if}

<div class="box">
	{card.type}
	{#if card.familles.total().length > 0}
		-
		{#each card.familles.total() as famille, i}
			{#if i > 0}&nbsp{/if}{famille}
		{/each}
	{/if}
</div>
