<script>
	import Dropdown from './Dropdown.svelte';

	export let System;
	export var levelSelect;
	export let typeSelect;
	export let familleSelect;
	export let elementSelect;
	export let sorting;
	export let close;
</script>

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
	<div id="options">
		<div class="container">
			Niveau
			<div>
				<svelte:component
					this={Dropdown}
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
				<svelte:component
					this={Dropdown}
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
				<svelte:component
					this={Dropdown}
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
				<svelte:component
					this={Dropdown}
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
	<button
		class="classic"
		on:click={() => {
			sorting(levelSelect, typeSelect, familleSelect, elementSelect);
		}}>Valider</button
	>
</div>

<style>
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
</style>
