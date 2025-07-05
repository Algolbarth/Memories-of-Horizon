<script>
	export let card;
</script>

<div class="box">
	<i>Effet</i>

	<br />
	
	<svelte:component this={card.text} System={card.System} {card} />
</div>
