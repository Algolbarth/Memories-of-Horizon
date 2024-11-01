<script>
	export let System;

	function save() {
		let text =
			System.account.name +
			'_' +
			System.account.aventure.victory +
			'_' +
			System.account.aventure.defeat +
			'_' +
			System.account.construct.victory +
			'_' +
			System.account.construct.defeat +
			'_' +
			System.decks.length +
			'_';
		for (const deck of System.decks) {
			text += deck.name + '_' + deck.victory + '_' + deck.defeat + '_' + deck.cards.length + '_';
			for (const card of deck.cards) {
				text += card + '_';
			}
		}

		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', System.account.name);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	function logout() {
		System.decks = [];
		System.account = '';
		System.pages.change('TitleScreen');
	}
</script>

<div id="body">
	<img src="Pictures/Title.png" alt="Logo" class="logo" />
	<div id="list">
		<div>
			<button
				class="big"
				on:click={() => {
					System.pages.change('Play');
				}}>Jouer</button
			>
			<br /><br />
			<button
				class="big"
				on:click={() => {
					System.pages.change('Decks');
				}}>Decks</button
			>
			<br /><br />
			<button
				class="big"
				on:click={() => {
					System.pages.change('Library');
				}}>Bibliothèque</button
			>
			<br /><br />
			<button
				class="big"
				on:click={() => {
					System.pages.change('Universe');
				}}>Univers</button
			>
		</div>
		<div>
			<button
				class="big"
				on:click={() => {
					System.pages.change('Profil');
				}}>Profil</button
			>
			<br /><br />
			<button
				class="big"
				on:click={() => {
					System.pages.change('Settings');
				}}>Options</button
			>
			<br /><br />
			<button
				class="big"
				on:click={() => {
					System.pages.change('News');
				}}>Nouveautés</button
			>
			<br /><br />
			<button
				class="big"
				on:click={() => {
					save();
				}}>Sauvegarder</button
			>
			<br />
			<button
				class="classic"
				on:click={() => {
					logout();
				}}>Se déconnecter</button
			>
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

	button.big {
		width: 15vw;
	}
</style>
