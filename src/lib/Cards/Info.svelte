<script>
	export let System;
	export let name;

	$: card = System.cards.getByName(name);
</script>

<button
	on:click={() => {
		System.view.card = card;
	}}
>
	{name}
</button>

<style>
	button {
		color: darkgreen;
	}

	button:hover {
		color: greenyellow;
	}
</style>
