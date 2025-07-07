<script>
	import Root from '../lib/Root/Page.svelte';
	import { Train } from '../lib/Training/Train.js';

	export let System = {
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
		stories: [],
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

	import * as chapters from '../lib/Chapters/Data';
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

	import * as stories from '../lib/Stories';
	for (const story of Object.keys(stories)) {
		System.stories.push(new stories[story]());
	}
	for (let i = 0; i < System.stories.length; i++) {
		let j = i;
		while (j > 0 && System.stories[j - 1].id > System.stories[j].id) {
			let trans = System.stories[j];
			System.stories[j] = System.stories[j - 1];
			System.stories[j - 1] = trans;
			j--;
		}
	}

	System.music.init();
	System.page = "BlackScreen";
</script>

<div class="window">
	<div class="body">
		<Root bind:System  />
	</div>
</div>

<style>
	:root {
		--background: rgba(128, 128, 128, 1);
		--zone: rgba(169, 169, 169, 1);
		--card: rgba(105, 105, 105, 1);
		--preview: rgba(147, 108, 11, 1);
		--preview_hover: rgba(184, 134, 11, 1);
		--preview_deck: rgba(139, 69, 19, 1);
		--attacker: rgba(175, 0, 0, 1);
		--attacker_hover: rgba(125, 0, 0, 1);
		--link_hover: rgba(255, 215, 0, 1);
		--close: rgba(220, 20, 60, 1);
		--close_hover: rgba(139, 0, 0, 1);
		--story: rgba(255, 251, 202, 1);
		--shadow: rgba(0, 0, 0, 0.5);

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

	:global(input[type='number']) {
		font: inherit;
		margin: 0;
		padding: 0;
		width: 2em;
		background: none;
		border: none;
		border-bottom: 2px solid transparent;

		-moz-appearance: textfield;
	}

	:global(input[type='number']:focus) {
		outline: none;
		border-bottom: 2px solid black;
	}

	:global(input::-webkit-outer-spin-button, input::-webkit-inner-spin-button) {
		-webkit-appearance: none;
		margin: 0;
	}

	:global(label) {
		cursor: url('../Pictures/Select.cur'), pointer;
	}
</style>
