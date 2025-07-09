<script>
	export let card;
	export let System;
</script>

<div class="box">
	<i>Effet</i>

	<br />

	<svelte:component this={card.text} bind:System bind:card />
</div>
