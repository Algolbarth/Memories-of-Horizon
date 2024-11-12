<script>
	import { Train } from '../lib/Training/Train.js';

	export const System = {
		pages: {
			actual: {},
			list: [],
			add: function (name, svelte) {
				System.pages.list.push({
					name: name,
					svelte: svelte
				});
			},
			getByName: function (name) {
				for (const page of System.pages.list) {
					if (page.name == name) {
						return page;
					}
				}
			},
			change: function (name) {
				System.pages.actual = System.pages.getByName(name);
			}
		},
		ressources: [
			'Or',
			'Feu',
			'Eau',
			'Terre',
			'Air',
			'Végétal',
			'Mort',
			'Metal',
			'Arcane',
			'Foudre',
			'Glace',
			'Lumière',
			'Ombre',
			'Mana'
		],
		cards: {
			class: [],
			instance: [],
			getByName: function (name) {
				for (let i = 0; i < this.instance.length; i++) {
					if (this.instance[i].name == name) {
						return new this.class[i](System);
					}
				}
				return undefined;
			}
		},
		chapters: {
			class: [],
			instance: [],
			getRandom: function (number) {
				let level = parseInt((number - 1) / 5) + 1;
				return new this.class[level][parseInt(Math.random() * this.class[level].length)](
					System,
					number
				);
			}
		},
		bosses: {
			class: [],
			instance: [],
			getRandom: function (number) {
				let level = parseInt((number - 1) / 10) + 1;
				return new this.class[level][parseInt(Math.random() * this.class[level].length)](
					System,
					number
				);
			}
		},
		sort: {
			levels: ['Tous'],
			types: ['Tous', 'Action', 'Bâtiment', 'Créature', 'Objet', 'Lieu'],
			familles: ['Toutes'],
			elements: ['Tous']
		},
		copy: function (array) {
			let tab = [];
			for (const element of array) {
				tab.push(element);
			}
			return tab;
		},
		shuffle: function (array) {
			let i = array.length;
			while (i != 0) {
				let j = Math.floor(Math.random() * i);
				i--;

				[array[i], array[j]] = [array[j], array[i]];
			}
		},
		several: function (value, name) {
			let text = '';
			text += value + ' ' + name;
			if (value > 1) {
				text += 's';
			}
			return text;
		},
		view: {
			quick: undefined,
			card: undefined,
			reset: function () {
				this.quick = undefined;
				this.card = undefined;
			}
		},
		decks: [],
		train: new Train(),
		game: undefined,
		music: {
			current: undefined,
			volume: 50,
			list: [],
			slot: 0,
			number: 4,
			init: function () {
				for (let i = 1; i < System.music.number; i++) {
					System.music.list.push(i);
				}
				System.shuffle(System.music.list);
			},
			play: function () {
				if (this.slot < this.list.length - 1) {
					this.current = new Audio('./Music/' + this.list[this.slot] + '.mp3');
					this.current.addEventListener('ended', function () {
						this.play();
					});
					this.current.volume = this.volume / 100;
					this.current.play();
					this.slot++;
				} else {
					this.slot = 0;
					this.play();
				}
			}
		},
		show_intelligence: false,
		autoplay: false,
		auto_speed: 1000
	};

	for (let i = 0; i < 20; i++) {
		System.sort.levels.push(i + 1);
	}

	for (const element of System.ressources) {
		if (element == 'Or') {
			System.sort.elements.push('Neutre');
		} else if (element != 'Mana') {
			System.sort.elements.push(element);
		}
	}

	import * as cards from '../lib/Cards';
	for (const card of Object.keys(cards)) {
		let cardClass = cards[card];
		let cardInstance = new cardClass(System);

		for (const famille of cardInstance.familles.base) {
			if (!System.sort.familles.includes(famille)) {
				System.sort.familles.push(famille);
			}
		}

		System.cards.class.push(cardClass);
		System.cards.instance.push(cardInstance);
	}

	for (let i = 0; i < System.sort.familles.length; i++) {
		let j = i;
		while (j > 1 && System.sort.familles[j - 1].localeCompare(System.sort.familles[j]) > 0) {
			let swap = System.sort.familles[j];
			System.sort.familles[j] = System.sort.familles[j - 1];
			System.sort.familles[j - 1] = swap;
			j--;
		}
	}

	for (let i = 0; i <= 20; i++) {
		System.chapters.class.push([]);
		System.chapters.instance.push([]);
	}
	for (let i = 0; i <= 10; i++) {
		System.bosses.class.push([]);
		System.bosses.instance.push([]);
	}

	import * as chapters from '../lib/Chapters/index.js';
	for (const chapter of Object.keys(chapters)) {
		let chapterClass = chapters[chapter];
		let chapterInstance = new chapterClass(System, 0);

		let error = false;
		for (const step of chapterInstance.steps) {
			let ressources = [];
			for (const ressource of System.ressources) {
				ressources.push({
					name: ressource,
					value: 0
				});
			}
			for (const card of step.cards) {
				if (System.cards.getByName(card) == undefined) {
					console.log('Invalid card in a chapter : ' + card);
					error = true;
				} else {
					for (let i = 0; i < System.cards.getByName(card).cout.length; i++) {
						ressources[i].value += System.cards.getByName(card).cout[i].value();
					}
				}
			}
			for (const ressource of chapterInstance.ressources) {
				for (const cout of ressources) {
					if (cout.name == ressource.name && cout.value > ressource.value) {
						console.log(
							'Invalid ressources in a chapter : ' +
								ressource.name +
								' ' +
								(cout.value - ressource.value)
						);
						error = true;
					}
				}
			}
		}

		let level = chapterInstance.getLevel();
		if (chapterInstance.boss) {
			System.bosses.class[level / 2].push(chapterClass);
			System.bosses.instance[level / 2].push(chapterInstance);
		} else {
			System.chapters.class[level].push(chapterClass);
			System.chapters.instance[level].push(chapterInstance);
		}

		if (error) {
			console.log(chapterClass);
		}
	}

	import BlackScreen from '../lib/Login/BlackScreen.svelte';
	System.pages.add('BlackScreen', BlackScreen);

	import TitleScreen from '../lib/Login/TitleScreen.svelte';
	System.pages.add('TitleScreen', TitleScreen);

	import Login from '../lib/Login/Login.svelte';
	System.pages.add('Login', Login);

	import Register from '../lib/Login/Register.svelte';
	System.pages.add('Register', Register);

	import Menu from '../lib/Menu/Menu.svelte';
	System.pages.add('Menu', Menu);

	import Play from '../lib/Menu/Play.svelte';
	System.pages.add('Play', Play);

	import Construit from '../lib/Menu/Construit.svelte';
	System.pages.add('Construit', Construit);

	import Library from '../lib/Menu/Library.svelte';
	System.pages.add('Library', Library);

	import Profil from '../lib/Menu/Profil.svelte';
	System.pages.add('Profil', Profil);

	import Universe from '../lib/Menu/Universe.svelte';
	System.pages.add('Universe', Universe);

	import News from '../lib/Menu/News.svelte';
	System.pages.add('News', News);

	import Training from '../lib/Training/Main.svelte';
	System.pages.add('Training', Training);

	import Game from '../lib/Game/Game.svelte';
	System.pages.add('Game', Game);

	import Settings from '../lib/Menu/Settings.svelte';
	System.pages.add('Settings', Settings);

	import Dialog from '../lib/Game/Dialog.svelte';
	System.pages.add('Dialog', Dialog);

	import Finish from '../lib/Game/Finish.svelte';
	System.pages.add('Finish', Finish);

	import GameOver from '../lib/Game/GameOver.svelte';
	System.pages.add('GameOver', GameOver);

	import Decks from '../lib/Decks/List.svelte';
	System.pages.add('Decks', Decks);

	import Deck from '../lib/Decks/Deck.svelte';
	System.pages.add('Deck', Deck);

	import Add from '../lib/Decks/Add.svelte';
	System.pages.add('Add', Add);

	System.pages.change('BlackScreen');

	System.music.init();
</script>

<div class="window">
	<div class="body">
		<svelte:component this={System.pages.actual.svelte} {System} />
	</div>
</div>

<style>
	:root {
		--background: gray;
		--zone: darkgray;
		--card: dimgray;
		--preview: rgb(147, 108, 11);
		--preview_hover: darkgoldenrod;
		--preview_deck: saddlebrown;
		--attacker: rgb(175, 0, 0);
		--attacker_hover: rgb(125, 0, 0);
		--link_hover: gold;
		--close: crimson;
		--close_hover: darkred;

		--delay: 1s;
		--delay_hover: 0.1s;
	}

	:global(.window) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		background-color: var(--background);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
			Cantarell, 'Helvetica Neue', sans-serif;
		font-weight: bold;

		cursor: url('../Pictures/Hand.cur'), default;
		overflow: hidden;
	}

	:global(.body) {
		padding: 8px;
	}

	:global(input, button) {
		font-family: inherit;
		font-size: inherit;
		-webkit-padding: 0.4em 0;
		padding: 0.4em;
		margin: 0.25em 0 0.25em 0;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 2px;
		cursor: url('../Pictures/Select.cur'), pointer;
		background: var(--hover);
	}

	:global(button) {
		text-align: left;
		font-weight: bold;

		margin: 0;
		padding: 0;

		border: none;
		background-color: transparent;
	}

	:global(button:hover) {
		color: var(--link_hover);
	}

	:global(button.big) {
		text-align: center;
		padding: 1em;
		margin: 0.25em 0 0.25em 0;
		border: solid;
		color: black;
		transition: background-color var(--delay) ease-in-out;
		background-color: var(--preview);
	}

	:global(button.big:hover) {
		background-color: var(--preview_hover);
		transition: background-color var(--delay_hover) ease-in-out;
	}

	:global(button.close) {
		text-align: center;
		width: 2em;
		height: 2em;
		margin: 0.25em 0 0.25em 0;
		background: var(--close);
		border: solid;
		border-color: var(--close);
		font-weight: bold;
		color: white;
	}

	:global(button.close:hover) {
		background: var(--close_hover);
		border: solid;
	}

	:global(hr) {
		color: black;
		border: none;
		border-top: solid;
	}

	:global(.scroll) {
		overflow: scroll;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	:global(.scroll::-webkit-scrollbar) {
		display: none;
	}

	:global(label) {
		cursor: url('../Pictures/Select.cur'), pointer;
	}
</style>
