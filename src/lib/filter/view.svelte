<script lang="ts">
	import type { System } from "../system/class";
	import Dropdown from "../utils/dropdown.svelte";

	export let system: System;
	export let filterFunction: Function;
	export let filter_window: boolean;
	export let only_common: boolean = false;

	let select_name: string = system.filter.select_name;
	let select_effect: string = system.filter.select_effect;
	let select_level: string = system.filter.select_level;
	let level_additive: string = system.filter.level_additive;
	let select_type: string = system.filter.select_type;
	let select_family: string = "Ajouter";
	let select_families: string[] = system.filter.select_families;
	let families_additive: boolean = system.filter.families_additive;
	let select_element: string = "Ajouter";
	let select_elements: string[] = system.filter.select_elements;
	let elements_additive: boolean = system.filter.elements_additive;
	let select_common: boolean = system.filter.select_common;
	let select_rare: boolean = system.filter.select_rare;
	let select_legendary: boolean = system.filter.select_legendary;
</script>

<div class="window">
	<div id="body" class="center">
		<div style="text-align:right">
			<button
				class="square close"
				on:click={() => {
					filter_window = false;
				}}
			>
				X
			</button>
		</div>

		<br />

		<div id="options">
			<div class="container simple">
				<div>Nom</div>

				<div>
					<input type="text" placeholder={'Exemple: "Dragon"'} bind:value={select_name} />
				</div>
			</div>

			<div class="container simple">
				<div>Effet</div>

				<div>
					<input type="text" placeholder={'Exemple: "Pioche"'} bind:value={select_effect} />
				</div>
			</div>

			<div class="container multiple">
				<div>Niveau</div>

				<div class="selection">
					{#if select_level != "Tous"}
						<Dropdown
							width={5}
							array={system.filter.levels_additive}
							selected={level_additive}
							selecting={function (level: string) {
								level_additive = level;
							}}
						/>
					{/if}
				</div>

				<div>
					<Dropdown
						array={system.filter.levels}
						selected={select_level}
						selecting={function (level: string) {
							select_level = level;
						}}
					/>
				</div>
			</div>

			<div class="container multiple">
				<div>Éléments</div>

				<div>
					{#if select_elements.length > 0}
						{#each select_elements as element, index}
							{#if index > 0}
								<button
									on:click={() => {
										elements_additive = !elements_additive;
									}}
								>
									{elements_additive ? "OU" : "ET"}
								</button>
							{/if}
							<button
								class="removable"
								on:click={() => {
									select_elements.splice(index, 1);
									select_elements = select_elements;
								}}
							>
								{element}
							</button>
						{/each}
					{:else}
						<span class="default">Tous</span>
					{/if}
				</div>

				<div>
					<Dropdown
						array={system.filter.elements}
						selected={select_element}
						selecting={function (element: string) {
							if (!select_elements.includes(element)) {
								select_elements.push(element);
								select_elements = select_elements;
							}
						}}
					/>
				</div>
			</div>

			<div class="container multiple">
				<div>Type</div>

				<div></div>

				<div>
					<Dropdown
						array={system.filter.types}
						selected={select_type}
						selecting={function (type: string) {
							select_type = type;
						}}
					/>
				</div>
			</div>

			<div class="container multiple">
				<div>Familles</div>

				<div>
					{#if select_families.length > 0}
						{#each select_families as family, index}
							{#if index > 0}
								<button
									on:click={() => {
										families_additive = !families_additive;
									}}
								>
									{families_additive ? "OU" : "ET"}
								</button>
							{/if}
							<button
								class="removable"
								on:click={() => {
									select_families.splice(index, 1);
									select_families = select_families;
								}}
							>
								{family}
							</button>
						{/each}
					{:else}
						<span class="default">Toutes</span>
					{/if}
				</div>

				<div>
					<Dropdown
						array={system.filter.families}
						selected={select_family}
						selecting={function (family: string) {
							if (!select_families.includes(family)) {
								select_families.push(family);
								select_families = select_families;
							}
						}}
					/>
				</div>
			</div>
		</div>

		<br />

		{#if !only_common}
			<div class="checkboxes">
				<div>Rareté</div>

				<div>
					<input type="checkbox" bind:checked={select_common} id="common" />
					<label for="common">Commune</label>
				</div>

				<div>
					<input type="checkbox" bind:checked={select_rare} id="rare" />
					<label for="rare">Rare</label>
				</div>

				<div>
					<input type="checkbox" bind:checked={select_legendary} id="legendary" />
					<label for="legendary">Légendaire</label>
				</div>
			</div>
		{/if}

		<br />

		<button
			class="big"
			on:click={() => {
				if (!only_common) {
					system.filter.changeSelection(select_name, select_effect, select_level, level_additive, select_type, select_families, families_additive, select_elements, elements_additive, select_common, select_rare, select_legendary);
				} else {
					system.filter.changeSelection(select_name, select_effect, select_level, level_additive, select_type, select_families, families_additive, select_elements, elements_additive, true, false, false);
				}
				filterFunction();
				filter_window = false;
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
		width: 60vw;
		padding: 1vw;
		background: var(--zone);
		background-image: var(--asfalt);
		border: solid;
		border-width: 0.5vmin;
		text-align: center;
	}

	#options {
		text-align: left;
	}

	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding-bottom: 1vmin;
	}

	.simple {
		grid-template-columns: 1fr 2fr;
	}

	.multiple {
		grid-template-columns: repeat(3, 1fr);
	}

	.default {
		color: rgb(82, 82, 82);
	}

	.checkboxes {
		text-align: left;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	.big {
		width: 10vw;
	}

	input[type="text"] {
		width: 100%;
	}

	button.removable {
		margin-right: 0.4em;
	}

	button.removable:hover {
		color: var(--close);
	}

	.selection {
		text-align: right;
		padding-right: 1em;
	}
</style>
