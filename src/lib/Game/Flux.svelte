<script>
	export let System;

	function close() {
		System.game.flux = false;
	}

	let tab = [
		"Feu",
		"Terre",
		"Végétal",
		"Eau",
		"Air",
		"Mort",
		"Metal",
		"Foudre",
		"Lumière",
		"Arcane",
		"Glace",
		"Ombre",
	];
</script>

{#if System.game.flux}
	<div class="window">
		<div id="body" class="center">
			<div style="text-align:right;">
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

			<div class="container">
				{#each tab as ressource}
					<div class="ressource">
						<button
							style={"background:" +
								System.game.player.ressource(ressource).color +
								";color:" +
								(System.game.player.ressource(ressource)
									.light_font
									? "rgba(255, 255, 255, 1)"
									: "rgba(0, 0, 0, 1)")}
							class="big flux"
							on:click={() => {
								System.game.player.ressource(ressource)
									.current++;
								System.game.player.ressource(ressource).max++;
								System.game.player.flux--;
								if (System.game.player.flux == 0) {
									System.game.flux = false;
								}
							}}
						>
							{ressource}
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.window {
		background: var(--shadow);
	}

	#body {
		background-color: var(--card);
		width: 50%;
		min-height: max-content;
		max-height: 60vh;
		padding: 1%;
		border: solid;
		border-width: 5px;
	}

	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.ressource {
		text-align: center;
	}

	button.flux {
		height: 10vh;
		width: 80%;
		border-color:black;
	}

	button.flux:hover {
		border-color: gold;
	}
</style>
