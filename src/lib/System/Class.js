import { Train } from "../Training/Train.js";
import * as cards from "../Cards/Data/index.js";
import * as chapters from "../Chapters/Data";
import * as stories from "../Stories";
import { Music } from "../Music/Class.js";

export class System {
    stories = [];
    settings = new Settings();
    decks = [];
    train = new Train();
    game = undefined;
    ressources = [
        "Or",
        "Feu",
        "Eau",
        "Terre",
        "Air",
        "Végétal",
        "Mort",
        "Metal",
        "Arcane",
        "Foudre",
        "Glace",
        "Lumière",
        "Ombre",
        "Mana",
    ];
    sort = {
        levels: ["Tous"],
        types: ["Tous", "Action", "Bâtiment", "Créature", "Objet", "Lieu"],
        familles: ["Toutes"],
        elements: ["Tous"],
    };
    view = new View();
    music = new Music(this);
    cards = new Cards(this);
    chapters = new Chapters(this);
    bosses = new Bosses(this);

    constructor() {
        for (let i = 0; i < 20; i++) {
            this.sort.levels.push(i + 1);
        }

        for (const element of this.ressources) {
            if (element == "Or") {
                this.sort.elements.push("Neutre");
            } else if (element != "Mana") {
                this.sort.elements.push(element);
            }
        }

        for (const card of Object.keys(cards)) {
            let cardClass = cards[card];
            let cardInstance = new cardClass(this);

            for (const famille of cardInstance.familles.base) {
                if (!this.sort.familles.includes(famille)) {
                    this.sort.familles.push(famille);
                }
            }

            this.cards.class.push(cardClass);
            this.cards.instance.push(cardInstance);
        }

        for (let i = 0; i < this.sort.familles.length; i++) {
            let j = i;
            while (
                j > 1 &&
                this.sort.familles[j - 1].localeCompare(this.sort.familles[j]) > 0
            ) {
                let swap = this.sort.familles[j];
                this.sort.familles[j] = this.sort.familles[j - 1];
                this.sort.familles[j - 1] = swap;
                j--;
            }
        }

        for (let i = 0; i <= 20; i++) {
            this.chapters.class.push([]);
            this.chapters.instance.push([]);
        }
        for (let i = 0; i <= 10; i++) {
            this.bosses.class.push([]);
            this.bosses.instance.push([]);
        }

        for (const chapter of Object.keys(chapters)) {
            let chapterClass = chapters[chapter];
            let chapterInstance = new chapterClass(this, 0);

            let error = false;
            for (const step of chapterInstance.steps) {
                let ressources = [];
                for (const ressource of this.ressources) {
                    ressources.push({
                        name: ressource,
                        value: 0,
                    });
                }
                for (const card of step.cards) {
                    if (this.cards.getByName(card) == undefined) {
                        console.log("Invalid card in a chapter : " + card);
                        error = true;
                    } else {
                        for (let i = 0; i < this.cards.getByName(card).cout.length; i++) {
                            ressources[i].value += this.cards.getByName(card).cout[i].value();
                        }
                    }
                }
                for (const ressource of chapterInstance.ressources) {
                    for (const cout of ressources) {
                        if (cout.name == ressource.name && cout.value > ressource.value) {
                            console.log(
                                "Invalid ressources in a chapter : " +
                                ressource.name +
                                " " +
                                (cout.value - ressource.value),
                            );
                            error = true;
                        }
                    }
                }
            }

            let level = chapterInstance.getLevel();
            if (chapterInstance.boss) {
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
    class = [];
    instance = [];

    constructor(System) {
        this.System = System;
    };

    getByName(name) {
        for (let i = 0; i < this.instance.length; i++) {
            if (this.instance[i].name == name) {
                return new this.class[i](this.System);
            }
        }
        return undefined;
    };
};

class Chapters {
    class = [];
    instance = [];

    constructor(System) {
        this.System = System;
    };

    getRandom(number) {
        let level = parseInt((number - 1) / 5) + 1;
        return new this.class[level][
            parseInt(Math.random() * this.class[level].length)
        ](this.System, number);
    };
};

class Bosses {
    class = [];
    instance = [];

    constructor(System) {
        this.System = System;
    };

    getRandom(number) {
        let level = parseInt((number - 1) / 10) + 1;
        return new this.class[level][
            parseInt(Math.random() * this.class[level].length)
        ](this.System, number);
    };
};

class Settings {
    show_intelligence = false;
    autoplay = false;
    auto_speed = 1000;
};

class View {
    quick = undefined;
    card = undefined;

    reset() {
        this.quick = undefined;
        this.card = undefined;
    };
};
