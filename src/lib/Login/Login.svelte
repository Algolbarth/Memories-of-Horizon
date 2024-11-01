<script>
	import { Account } from './Account.js';
	import { Deck } from '../Decks/Deck.js';
	export let System;

	let files;
	let step;
	let save;

	async function login() {
		if (files != undefined) {
			save = await files[0].text();
			step = 0;

			System.account = new Account(System, readValue());
			System.account.aventure.victory = readInt();
			System.account.aventure.defeat = readInt();
			System.account.construct.victory = readInt();
			System.account.construct.defeat = readInt();
			let decks = readInt();
			for (let i = 0; i < decks; i++) {
				let deck = new Deck(System);
				deck.changeName(readValue(), 0);
				deck.victory = readInt();
				deck.defeat = readInt();
				let cards = readInt();
				for (let j = 0; j < cards; j++) {
					let name = readValue();
					if (System.cards.getByName(name) != undefined) {
						deck.add(name);
					}
				}
				System.decks.push(deck);
			}

			System.pages.change('Menu');
		}
	}

	function readValue() {
		let value = '';
		while (save[step] != '_' && step < save.length) {
			value += save[step];
			step++;
		}
		step++;
		return value;
	}

	function readInt() {
		return parseInt(readValue());
	}
</script>

<div id="body">
	<img src="Pictures/Title.png" alt="Logo" class="logo" />
	<br />
	<button
		class="classic"
		on:click={() => {
			System.pages.change('TitleScreen');
		}}>Retour</button
	>
	<br /><br />
	Fichier de la save
	<br />
	<input type="file" bind:files />
	<br />
	<button
		class="big"
		on:click={() => {
			login();
		}}>Valider</button
	>
</div>

<style>
	#body {
		text-align: center;
	}

	button.big {
		width: 15vw;
	}

	input[type='file'] {
		border: none;
	}
</style>
