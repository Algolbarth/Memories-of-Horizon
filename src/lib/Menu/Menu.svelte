<script>
    import { save } from "../Login/Save";

	export let System;

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
						save(System);
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
