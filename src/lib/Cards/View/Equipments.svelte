<script>
	export let System;
	export let card;
</script>

<div class="box">
	<i>Équipements</i>
	({card.equipments.length} / {card.stat("Maniement").value()})

	<br />

	{#each card.equipments as equipment}
		<button
			on:click={() => {
				System.view.card = equipment;
			}}
		>
			{equipment.name}
		</button>
		<br />
	{/each}
</div>
