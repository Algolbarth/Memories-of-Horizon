<script>
	export let System;

	function save() {
		let text = "MoH_" + System.account.name + "_";
		text +=
			System.account.aventure.victory +
			"_" +
			System.account.aventure.defeat +
			"_" +
			System.account.construct.victory +
			"_" +
			System.account.construct.defeat +
			"_";
		text +=
			System.music.volume + "_" + System.settings.show_intelligence + "_";
		text += System.decks.length + "_";
		for (const deck of System.decks) {
			text +=
				deck.name +
				"_" +
				deck.victory +
				"_" +
				deck.defeat +
				"_" +
				deck.cards.length +
				"_";
			for (const card of deck.cards) {
				text += card + "_";
			}
		}

		var element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," + encodeURIComponent(text),
		);
		element.setAttribute("download", "MoH_" + System.account.name);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	function logout() {
		System.decks = [];
		System.account = "";
		System.page = "TitleScreen";
	}
</script>

<div id="body">
	<img src="src/assets/Pictures/Title.png" alt="Logo" class="logo" />
	<div id="list">
		<div class="column">
			<div>
				<button
					class="big menu"
					on:click={() => {
						System.page = "Play";
					}}
				>
					Jouer
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						System.page = "Decks";
					}}
				>
					Decks
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						System.page = "Library";
					}}
				>
					Bibliothèque
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						System.page = "Universe";
					}}
				>
					Univers
				</button>
			</div>
		</div>
		<div class="column">
			<div>
				<button
					class="big menu"
					on:click={() => {
						System.page = "Profil";
					}}
				>
					Profil
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						System.page = "Settings";
					}}
				>
					Options
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						System.page = "News";
					}}
				>
					Nouveautés
				</button>
			</div>

			<div>
				<button
					class="big menu"
					on:click={() => {
						save();
					}}
				>
					Sauvegarder
				</button>
				<br />
				<button
					on:click={() => {
						logout();
					}}
				>
					Se déconnecter
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	#body {
		text-align: center;
	}

	#list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.column {
		display: grid;
		grid-template-rows: repeat(4, 1fr);
	}
</style>
