<script>
	import Dropdown from "../Utils/Dropdown.svelte";

	export let System;
	export var levelSelect;
	export let typeSelect;
	export let familleSelect;
	export let elementSelect;
	export let rarity = true;
	export let communSelect = false;
	export let rareSelect = false;
	export let legendarySelect = false;
	export let sorting;
	export let close;
</script>

<div class="window">
	<div id="body" class="center">
		<div style="text-align:right">
			<button
				class="close"
				on:click={() => {
					close();
				}}
			>
				X
			</button>
		</div>

		<br />

		<div id="options">
			<div class="container">
				Niveau
				<div>
					<Dropdown
						array={System.sort.levels}
						selected={levelSelect}
						selecting={function (element) {
							levelSelect = element;
						}}
					/>
				</div>
			</div>
			<div class="container">
				Type
				<div>
					<Dropdown
						array={System.sort.types}
						selected={typeSelect}
						selecting={function (element) {
							typeSelect = element;
						}}
					/>
				</div>
			</div>
			<div class="container">
				Famille
				<div>
					<Dropdown
						array={System.sort.familles}
						selected={familleSelect}
						selecting={function (element) {
							familleSelect = element;
						}}
					/>
				</div>
			</div>
			<div class="container">
				Élément
				<div>
					<Dropdown
						array={System.sort.elements}
						selected={elementSelect}
						selecting={function (element) {
							elementSelect = element;
						}}
					/>
				</div>
			</div>
		</div>

		<br />

		{#if rarity}
			<div class="checkboxes">
				<div>Rareté</div>

				<div>
					<input
						type="checkbox"
						bind:checked={communSelect}
						id="commun"
					/>
					<label for="commun">Commune</label>
				</div>

				<div>
					<input
						type="checkbox"
						bind:checked={rareSelect}
						id="rare"
					/>
					<label for="rare">Rare</label>
				</div>

				<div>
					<input
						type="checkbox"
						bind:checked={legendarySelect}
						id="legendary"
					/>
					<label for="legendary">Légendaire</label>
				</div>
			</div>
		{/if}

		<br />

		<button
			class="big"
			on:click={() => {
				if (rarity) {
					sorting(
						levelSelect,
						typeSelect,
						familleSelect,
						elementSelect,
						communSelect,
						rareSelect,
						legendarySelect,
					);
				} else {
					sorting(
						levelSelect,
						typeSelect,
						familleSelect,
						elementSelect,
					);
				}
			}}
		>
			Valider
		</button>
	</div>
</div>

<style>
	.window {
		background: var(--shadow);
	}

	#body {
		width: 30vw;
		padding: 1%;
		background: var(--zone);
		border: solid;
		border-width: 5px;
		text-align: center;
	}

	#options {
		text-align: left;
	}

	.container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		padding-bottom: 10px;
	}

	.checkboxes {
		text-align: left;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	.big {
		width: 10vw;
	}
</style>
