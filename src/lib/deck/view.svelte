<script lang="ts">
	import type { System } from "$lib/system/class";
	import { several } from "../utils";
	import { Deck } from "./class";

	export let system: System;

	$: deck = system.view.quick == undefined ? system.view.card : system.view.quick;
</script>

{#if deck != undefined && deck instanceof Deck}
	<div id="shadow">
		<div id="body" class={deck.mode}>
			<div id="cover">
				<div class="inside">
					<div class="box name center" style="text-align:center">
						{deck.name}
					</div>
				</div>
			</div>

			<div id="content">
				<div class="inside inside-bottom scroll">
					{#if deck != system.train_deck}
						<div class={"box score " + deck.mode}>
							<div class={"cost " + deck.mode}>
								{several(deck.victory + deck.defeat, ["Partie", "jouée"])}
							</div>

							{#if deck.victory + deck.defeat > 0}
								<div class={"cost " + deck.mode}>
									{several(deck.victory, ["Victoire"])}
								</div>

								<div class={"cost " + deck.mode}>
									{several(deck.defeat, ["Défaite"])}
								</div>
							{/if}
						</div>
					{/if}

					<div class={"box score " + deck.mode}>
						<div class={"cost " + deck.mode}>
							{#if deck.cards.length > 0}
								{several(deck.cards.length, ["Carte"])}
							{:else}
								Vide
							{/if}
						</div>
					</div>

					{#if deck.cards.length > 0}
						<div class={"box " + deck.mode}>
							<div class="histo">
								<div class="chart">
									{#each deck.levels as level}
										<div class="col">
											{#if level[1] > 0}
												<span class="count">{level[1]}</span>
												<div class={"bar " + deck.mode} style="height:{Math.round((level[1] / deck.most_popular_level) * 100)}%"></div>
											{/if}
										</div>
									{/each}
								</div>

								<div class="labels">
									{#each deck.levels as level}
										<span>{level[0]}</span>
									{/each}
								</div>
							</div>
						</div>

						<div class={"box elements " + deck.mode}>
							{#each deck.elements as element}
								{#if element[1] > 0}
									<div class="cost" style={"background-color:" + system.ressources.find("", element[0])?.color + ";color:" + (system.ressources.find("", element[0])?.light_font ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")}>
										{element[1]}
										{[element[0]]}
									</div>
								{/if}
							{/each}
						</div>

						<div class={"box types " + deck.mode}>
							{#each deck.types as type}
								<div class={"cost " + deck.mode}>
									{several(type[1], [type[0]])}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	#shadow {
		width: 40vw;
		height: 90vh;
		margin: 2.5vh;
	}

	#shadow::before {
		content: "";
		position: absolute;
		z-index: -1;
		width: 40vw;
		height: 90vh;
		border: solid;
		border-width: 0.5em;
		box-shadow: 0px 15px 15px rgba(0, 0, 0, 1);
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	#shadow:hover::before {
		transition: opacity 0.5s ease-in-out;
		opacity: 1;
	}

	#body {
		position: relative;
		display: grid;

		border: solid;
		border-width: 0.5em;

		width: 100%;
		height: 100%;

		background-image: var(--leather);

		box-shadow: 0px 5px 5px rgba(0, 0, 0, 1);
		transition: box-shadow 0.5s ease-in-out;
		grid-template-rows: 1fr 3fr;

		&.standard {
			background-color: rgb(150, 75, 0);
		}

		&.wild {
			background-color: rgb(100, 50, 0);
		}

		&.train {
			background-color: rgb(75, 0, 0);
		}
	}

	#body:hover {
		transition: all 1s ease-in-out;
		box-shadow: none;
	}

	#cover {
		position: relative;
		border: solid;
		box-shadow: 0px 5px 5px rgba(0, 0, 0, 1);
		padding: 0.5em;
	}

	#content {
		padding: 1vw;
		height: 67.5vh;
	}

	div.box {
		background-image: var(--scroll);
		border-style: solid;
		transition: none;

		&.standard {
			background-color: rgb(150, 75, 0);
		}

		&.wild {
			background-color: var(--card_hover);
		}

		&.train {
			background-color: rgb(150, 7, 7);
		}
	}

	div.score {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.2em;
	}

	div.inside {
		border: dashed;
		position: relative;
		height: 97.5%;
		padding-left: 0.5em;
		padding-right: 0.5em;
	}

	div.inside-bottom {
		padding-top: 0.5em;
	}

	div.name {
		background-image: none;
		background-color: gold;
	}

	div.name:hover {
		background-color: goldenrod;
	}

	div.chart {
		display: flex;
		align-items: flex-end;
		gap: 0.1em;
		height: 10em;
		border-bottom: 0.1em solid #000;
		margin-bottom: 0.3em;
	}

	div.col {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.1em;
		flex: 1;
		height: 100%;
		justify-content: flex-end;
	}

	div.bar {
		width: 100%;
		background-image: var(--paper);
		border: solid;
		border-width: 0.1em 0.1em 0 0.1em;
		border-radius: 2px 2px 0 0;
		transition: background 0.15s;

		&.standard {
			background-color: rgb(150, 75, 0);
		}

		&.wild {
			background-color: var(--card_hover);
		}

		&.train {
			background-color: rgb(150, 7, 7);
		}
	}

	div.bar:hover {
		background-color: var(--card_hover);
	}

	span.count {
		font-size: 1em;
		color: #000;
		min-height: 14px;
	}

	div.labels {
		display: flex;
		gap: 0.1em;
	}

	div.labels span {
		flex: 1;
		text-align: center;
		font-size: 1em;
		color: #000;
	}

	div.elements {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.2em;
	}

	div.types {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.2em;
	}

	div.cost {
		display: inline;
		padding: 0.2em;

		border: solid;
		border-color: black;
		border-width: 0.2vmin;
		border-radius: 5px;

		background-image: var(--paper);

		&.standard {
			background-color: rgb(150, 75, 0);
		}

		&.wild {
			background-color: var(--card_hover);
		}

		&.train {
			background-color: rgb(150, 7, 7);
		}
	}
</style>
