<script>
	export let System;
	export let name;

	$: card = System.cards.getByName(name);
</script>

<button
	on:click={() => {
		System.view.card = card;
		System.pages.change(System.pages.actual.name);
	}}>{name}</button
>
