<script>
	export let card;
</script>

<div class="box">
	<i>Effet</i>

	<br />

	<svelte:component this={card.text} bind:System={card.System} bind:card />
</div>
