<script lang="ts">
	import type { System } from "$lib/system/class";
	import Dropdown from "../utils/dropdown.svelte";

	export let system: System;
	export let filterFunction: Function;
	export let filter_window: boolean;
	export let only_common: boolean = false;

	let select_name: string = system.filter.select_name;

	let select_level: string = system.filter.select_level;
	let select_level_operator: string = system.filter.select_level_operator;

	let select_element: string = "Ajouter";
	let select_elements: string[] = system.filter.select_elements;
	let select_elements_logic: boolean = system.filter.select_elements_logic;

	let select_type: string = system.filter.select_type;

	let select_family: string = "Ajouter";
	let select_families: string[] = system.filter.select_families;
	let select_families_logic: boolean = system.filter.select_families_logic;

	let select_effect: string = system.filter.select_effect;
	let select_effect_order: boolean = system.filter.select_effect_order;

	let select_common: boolean = system.filter.select_common;
	let select_rare: boolean = system.filter.select_rare;
	let select_legendary: boolean = system.filter.select_legendary;

	let select_stat: string = system.filter.select_stat;
	let select_stat_value: number = system.filter.select_stat_value;
	let select_stat_operator: string = system.filter.select_stat_operator;
</script>

<div class="window">
	<div id="body" class="center">
		<div style="text-align:right;">
			<button
				class="square close"
				on:click={() => {
					filter_window = false;
				}}
			>
				X
			</button>
		</div>

		<hr class="big" />

		<div id="options">
			<div class="container simple">
				<div>Nom</div>

				<div>
					<input type="text" placeholder={'Exemple: "Dragon"'} bind:value={select_name} />
				</div>
			</div>

			<hr />

			<div class="container multiple">
				<div>Niveau</div>

				<div>
					<Dropdown
						array={system.filter.levels}
						selected={select_level}
						selecting={function (operator: string) {
							select_level = operator;
						}}
					/>
				</div>

				<div class="selection">
					{#if select_level != "Tous"}
						<Dropdown
							width={5}
							array={system.filter.operators}
							selected={select_level_operator}
							selecting={function (level: string) {
								select_level_operator = level;
							}}
						/>
					{/if}
				</div>
			</div>

			<hr />

			<div class="container multiple">
				<div>Éléments</div>

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

				<div>
					{#if select_elements.length > 0}
						{#each select_elements as element, index}
							{#if index > 0}
								<button
									on:click={() => {
										select_elements_logic = !select_elements_logic;
									}}
								>
									{select_elements_logic ? "OU" : "ET"}
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
			</div>

			<hr />

			<div class="container multiple">
				<div>Type</div>

				<div>
					<Dropdown
						array={system.filter.types}
						selected={select_type}
						selecting={function (type: string) {
							select_type = type;
						}}
					/>
				</div>

				<div></div>
			</div>

			<hr />

			<div class="container multiple">
				<div>Familles</div>

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

				<div>
					{#if select_families.length > 0}
						{#each select_families as family, index}
							{#if index > 0}
								<button
									on:click={() => {
										select_families_logic = !select_families_logic;
									}}
								>
									{select_families_logic ? "OU" : "ET"}
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
			</div>

			<hr />

			<div class="container simple">
				<div>Effet</div>

				<div>
					<input type="text" placeholder={'Exemple: "Pioche"'} bind:value={select_effect} />
				</div>
			</div>

			<br />

			<div class="container simple">
				<div></div>

				<label class="form-control" for="effect_order">
					<input type="checkbox" bind:checked={select_effect_order} id="effect_order" />
					Respecter l'ordre des mots
				</label>
			</div>

			<hr />

			{#if !only_common}
				<div class="container simple">
					<div>Rareté</div>

					<div class="checkboxes">
						<div>
							<label class="form-control" for="common">
								<input type="checkbox" bind:checked={select_common} id="common" />
								Commune
							</label>
						</div>

						<div>
							<label class="form-control" for="rare">
								<input type="checkbox" bind:checked={select_rare} id="rare" />
								Rare
							</label>
						</div>

						<div>
							<label class="form-control" for="legendary">
								<input type="checkbox" bind:checked={select_legendary} id="legendary" />
								Légendaire
							</label>
						</div>
					</div>
				</div>
			{/if}

			<hr />

			<div class="container multiple">
				<div>Statistique</div>

				<div>
					<Dropdown
						array={system.filter.stats}
						selected={select_stat}
						selecting={function (stat: string) {
							if (stat != "") {
								select_stat = stat;
							}
						}}
					/>
				</div>

				<div class="stat selection">
					{#if select_stat != "Aucune"}
						<Dropdown
							width={5}
							array={system.filter.operators}
							selected={select_stat_operator}
							selecting={function (operator: string) {
								select_stat_operator = operator;
							}}
						/>

						<div>
							<input type="number" bind:value={select_stat_value} />
						</div>
					{/if}
				</div>
			</div>
		</div>

		<hr class="big" />

		<div style="display: grid;grid-template-columns: repeat(2, 1fr);align-items:center;">
			<div style="text-align:left;">
				<button
					class="square clear"
					on:click={() => {
						select_name = "";

						select_level = "Tous";
						select_level_operator = "=";

						select_element = "Ajouter";
						select_elements = [];
						select_elements_logic = true;

						select_type = "Tous";

						select_family = "Ajouter";
						select_families = [];
						select_families_logic = true;

						select_effect = "";
						select_effect_order = false;

						select_common = true;
						select_rare = false;
						select_legendary = false;

						select_stat = "Aucune";
						select_stat_operator = "≥";
						select_stat_value = 1;
					}}
				>
					⭯
				</button>
			</div>

			<div style="text-align:right;">
				<button
					class="big"
					on:click={() => {
						if (only_common) {
							select_common = true;
							select_rare = false;
							select_legendary = false;
						}

						system.filter.changeSelection(select_name, select_level, select_level_operator, select_elements, select_elements_logic, select_type, select_families, select_families_logic, select_effect, select_effect_order, select_common, select_rare, select_legendary, select_stat_operator, select_stat_value, select_stat);

						filterFunction();
						filter_window = false;
					}}
				>
					Valider
				</button>
			</div>
		</div>
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

	div.container {
		display: grid;
		align-items: center;
	}

	div.simple {
		grid-template-columns: 0.3fr 2fr;
	}

	div.multiple {
		grid-template-columns: 0.3fr 0.75fr 1.25fr;
	}

	.default {
		color: rgb(82, 82, 82);
	}

	div.checkboxes {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
	}

	button.big {
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
		padding-right: 1em;
	}

	.stat {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	hr {
		color: rgba(0, 0, 0, 0.25);
	}

	hr.big {
		color: black;
		margin-top: 1em;
		margin-bottom: 1em;
	}
</style>
