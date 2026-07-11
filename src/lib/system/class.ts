import { Train } from "../training/train";
import * as cards from "../cards/data";
import * as chapters from "../chapters/data";
import * as stories from "../lore/data";
import * as decks from "../deck/data";
import { Music } from "../music/class";
import { Settings } from "../settings/class";
import { RessourceList } from "../ressources/class";
import { Deck } from "$lib/deck/class";
import type { Story } from "../lore/class";
import { Game } from "$lib/game/class";
import { Card } from "$lib/cards/class/card";
import { Chapter } from "../chapters/class";
import type { Account } from "../profil/account";
import { Filter } from "../filter/class";

export class System {
    page: string = "BlackScreen";
    account: Account | undefined;
    settings: Settings = new Settings();
    music: Music = new Music(this);
    ressources: RessourceList = new RessourceList();
    cards: Cards = new Cards(this);
    chapters: Chapters = new Chapters(this);
    bosses: Bosses = new Bosses(this);
    standard_decks: Deck[] = [];
    wild_decks: Deck[] = [];
    train_deck: Deck = new Deck(this, "train");
    game: undefined | Game;
    train: Train = new Train(this);
    deck: Deck | undefined;
    stories: Story[] = [];
    filter = new Filter(this);
    view: View = new View();

    constructor() {
        this.addElementsToFilter();
    };

    addElementsToFilter = () => {
        for (const element of this.ressources.list) {
            if (element.name == "Or") {
                this.filter.elements.push("Neutre");
            } else if (element.name != "Mana") {
                this.filter.elements.push(element.name);
            }
        }
    };

    importCards = () => {
        for (const card of Object.keys(cards)) {
            let cardClass = cards[card];
            let cardInstance = new cardClass(this);

            for (const family of cardInstance.families.base) {
                if (!this.filter.families.includes(family)) {
                    this.filter.families.push(family);
                }
            }

            this.cards.class.push(cardClass);
            this.cards.instance.push(cardInstance);
        }

        this.addFamiliesToFilter();
    };

    addFamiliesToFilter = () => {
        for (let i = 0; i < this.filter.families.length; i++) {
            let j = i;
            while (j > 0 && this.filter.families[j - 1].localeCompare(this.filter.families[j], "fr") > 0) {
                let swap = this.filter.families[j];
                this.filter.families[j] = this.filter.families[j - 1];
                this.filter.families[j - 1] = swap;
                j--;
            }
        }
    };

    importChapters = () => {
        for (const chapter of Object.keys(chapters)) {
            let chapterClass = chapters[chapter];
            let chapterInstance: Chapter = new chapterClass(this, new Game(this, "Test"), 0);

            let error: boolean = false;
            for (const step of chapterInstance.steps) {
                let ressources = [];
                for (const ressource of this.ressources.list) {
                    ressources.push({
                        name: ressource.name,
                        value: 0,
                    });
                }
                for (const card_name of step.cards) {
                    let card = this.cards.getByName(card_name);
                    if (card == undefined) {
                        console.log(card + " n'est pas une carte existante");
                        error = true;
                    } else {
                        for (let i = 0; i < card.cost.length; i++) {
                            ressources[i].value += card.cost[i].value();
                        }
                    }
                }
                for (const ressource of ressources) {
                    if (ressource.value > 0) {
                        let check = false;
                        for (const cost of chapterInstance.ressources) {
                            if (cost.name == ressource.name) {
                                check = true;
                                if (ressource.value > cost.value) {
                                    console.log("Il manque des ressources : " + ressource.name + " " + (ressource.value - cost.value));
                                    error = true;
                                }
                            }
                        }
                        if (!check) {
                            console.log("Il manque des ressources : " + ressource.name + " " + ressource.value);
                            error = true;
                        }
                    }
                }
            }

            let level = chapterInstance.getLevel();
            if (chapterInstance.is_boss) {
                this.bosses.class[level / 2].push(chapterClass);
                this.bosses.instance[level / 2].push(chapterInstance);
            } else {
                this.chapters.class[level].push(chapterClass);
                this.chapters.instance[level].push(chapterInstance);
            }

            if (error) {
                console.log(chapterClass);
            }
        }

        this.checkIfAtLeastOnChapterByLevel();
    };

    checkIfAtLeastOnChapterByLevel = () => {
        let index: number = 0;
        for (const level of this.chapters.instance) {
            if (index > 0 && level.length == 0) {
                console.log("Il n'y a pas de chapitre de niveau " + index);
            }
            index++;
        }
    };

    importDecks = () => {
        for (const deck of Object.keys(decks)) {
            this.standard_decks.push(new decks[deck](this));
        }

        this.train_deck.name = "Deck d'entraînement";
        let card_list: string[] = [];
        for (const card of this.cards.instance) {
            if (card.trait("Commune").value()) {
                card_list.push(card.name);
            }
        }
        this.train_deck.addList(card_list);

        this.train = new Train(this);
    };

    importLore = () => {
        for (const story of Object.keys(stories)) {
            this.stories.push(new stories[story]());
        }
        for (let i = 0; i < this.stories.length; i++) {
            let j = i;
            while (j > 0 && this.stories[j - 1].id > this.stories[j].id) {
                let trans = this.stories[j];
                this.stories[j] = this.stories[j - 1];
                this.stories[j - 1] = trans;
                j--;
            }
        }
    };

};

class Cards {
    class: any[] = [];
    instance: Card[] = [];
    system: System;

    constructor(system: System) {
        this.system = system;
    };

    getByName(name: string): Card {
        for (let i = 0; i < this.instance.length; i++) {
            if (this.instance[i].name == name) {
                return new this.class[i](this.system);
            }
        }
        console.log(name + " n'est pas une carte existante");
        return new Card(this.system);
    };
};

class Chapters {
    class: any[][] = [];
    instance: Chapter[][] = [];
    system: System;

    constructor(system: System) {
        this.system = system;

        for (let i = 0; i <= 20; i++) {
            this.class.push([]);
            this.instance.push([]);
        }
    };

    getRandom(number: number): Chapter {
        let level = Math.floor((number - 1) / 5) + 1;
        return new this.class[level][Math.floor(Math.random() * this.class[level].length)](this.system, this.system.game, number);
    };
};

class Bosses {
    class: any[][] = [];
    instance: Chapter[][] = [];
    system: System;

    constructor(system: System) {
        this.system = system;

        for (let i = 0; i <= 10; i++) {
            this.class.push([]);
            this.instance.push([]);
        }
    };

    getRandom(number: number): Chapter {
        let level = Math.floor((number - 1) / 10) + 1;
        return new this.class[level][Math.floor(Math.random() * this.class[level].length)](this.system, this.system.game, number);
    };
};

class View {
    quick: Deck | Card | undefined = undefined;
    card: Deck | Card | undefined = undefined;

    reset() {
        this.quick = undefined;
        this.card = undefined;
    };
};