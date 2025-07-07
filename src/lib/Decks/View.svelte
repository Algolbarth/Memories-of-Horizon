<script>
	export let System;

	$: deck = System.view.quick == undefined ? System.view.card : System.view.quick;
</script>

{#if deck != undefined}
	<div id="shadow">
		<div id="body">
			<div id="cover">
				<div class="box center" style="text-align:center">
					{deck.name}
				</div>
			</div>
			<div id="content">
				<div class="box">
					{#if deck.cards.length > 0}
						{deck.cards.length} cartes
					{:else}
						Vide
					{/if}
				</div>
				<div class="box">
					{deck.victory + deck.defeat} parties jouées
					<br />
					{deck.victory} gagnées
					<br />
					{deck.defeat} perdues
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
		content: '';
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
		background-color: var(--preview_deck);
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
	}

	#content {
		padding: 2%;
	}
</style>
