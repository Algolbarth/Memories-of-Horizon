<script lang="ts">
	import type { System } from "$lib/system/class";
	import { several } from "../utils";
	import { Deck } from "./class";

	export let system: System;

	$: deck = system.view.quick == undefined ? system.view.card : system.view.quick;
</script>

{#if deck != undefined && deck instanceof Deck}
	<div id="shadow">
		<div id="body">
			<div id="cover">
				<div class="inside">
					<div class="box center" style="text-align:center">
						{deck.name}
					</div>
				</div>
			</div>

			<div id="content">
				<div class="inside inside-bottom">
					<div class="box">
						{#if deck.cards.length > 0}
							{several(deck.cards.length, ["carte"])}
						{:else}
							Vide
						{/if}
					</div>

					{#if deck != system.train_deck}
						<div class="box">
							{several(deck.victory + deck.defeat, ["parties", "jouées"])}
							<br />
							{several(deck.victory, ["gagnée"])}
							<br />
							{several(deck.defeat, ["perdue"])}
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
		border-width: 10px;
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
		border-width: 10px;

		width: 100%;
		height: 100%;

		background-color: var(--deck);
		background-image: var(--leather);

		box-shadow: 0px 5px 5px rgba(0, 0, 0, 1);
		transition: all 0.5s ease-in-out;
		grid-template-rows: 0.25fr 0.75fr;
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
	}

	div.box {
		background-image: var(--scroll);
		border-style: solid;
	}

	div.inside {
		border: dashed;
		position: relative;
		height: 95%;
		padding-left: 0.5em;
		padding-right: 0.5em;
	}

	div.inside-bottom {
		padding-top: 0.5em;
	}
</style>
