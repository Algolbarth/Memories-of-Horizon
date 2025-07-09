<script>
	export let System;
	export let zone;
	export let entity;

	let level = zone.level;
</script>

<div class="zone">
	{zone.name}
	{#if zone.name == "Boutique"}
		Nv
		<input
			type="number"
			min="1"
			max="20"
			bind:value={level}
			on:change={() => {
				if (level < 1) {
					level = 1;
				} else if (level > 20) {
					level = 20;
				} else {
					zone.level = level;
				}
			}}
		/>
	{/if}
	-
	{#if zone.name != "Défausse"}
		({zone.cards.length} / {zone.size}) -
	{/if}
	<button
		on:click={() => {
			System.view.reset();
			System.train.add.entity = entity;
			System.train.add.zone = zone;
		}}
	>
		Ajouter une carte
	</button>

	{#each zone.cards as card, i}
		<div class="preview">
			{#if entity == "player"}
				<div>
					<button
						on:click={() => {
							System.view.card = System.cards.getByName(card);
						}}
						on:mouseenter={() => {
							System.view.quick = System.cards.getByName(card);
						}}
						on:mouseleave={() => {
							System.view.quick = undefined;
						}}
					>
						{card}
					</button>
				</div>
				<div style="text-align:right;">
					{#if zone.name != "Lieux" || zone.cards.length > 1}
						<button
							class="remove"
							on:click={() => {
								zone.cards.splice(i, 1);
								System = System;
							}}
						>
							Enlever
						</button>
					{/if}
				</div>
			{:else}
				<div>
					{#if zone.name != "Lieux" || zone.cards.length > 1}
						<button
							class="remove"
							on:click={() => {
								zone.cards.splice(i, 1);
								System = System;
							}}
						>
							Enlever
						</button>
					{/if}
				</div>
				<div style="text-align:right;">
					<button
						on:click={() => {
							System.view.card = System.cards.getByName(card);
						}}
						on:mouseenter={() => {
							System.view.quick = System.cards.getByName(card);
						}}
						on:mouseleave={() => {
							System.view.quick = undefined;
						}}
					>
						{card}
					</button>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.zone {
		background-color: var(--zone);
		border: solid;
		margin: 1%;
		padding: 1%;
	}

	.preview {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.remove {
		color: var(--close_hover);
	}

	.remove:hover {
		color: var(--close);
	}

	input[type="number"] {
		width: 1.5em;
	}
</style>
