import { Entity } from './Entity.js';
import { Chapter } from './Chapter.js';
import { Battle } from './Battle.js';

export class Game extends Battle {
    use = {
        card: undefined,
        svelte: undefined,
        set: function (card, svelte) {
            this.card = card;
            this.svelte = svelte;
        },
        reset: function () {
            this.card = undefined;
            this.svelte = undefined;
        }
    };
    flux = false;
    pause = false;
    phase = "Préparation";
    deck = undefined;

    constructor(System, mode) {
        super(System);

        this.mode = mode;
    };

    init = function () {
        this.player = new Entity(this.System);
        this.bot = new Entity(this.System);

        if (this.mode == "Entraînement") {
            this.player.life.set(this.System.train.player.life);
            this.player.ressource("Or").max = this.System.train.player.gold;
            this.player.flux = this.System.train.player.flux;
            this.player.zone("Boutique").level = this.System.train.player.zones[1].level;
            for (const zone of this.System.train.player.zones) {
                for (const card_name of zone.cards) {
                    this.player.getCard(card_name).add(zone.name);
                }
            }
            this.player.place = this.player.zone("Lieux").cards[0];

            this.bot.life.set(this.System.train.bot.life);
            this.bot.ressource("Or").max = this.System.train.bot.gold;
            this.bot.ressource("Or").current = this.System.train.bot.gold;
            this.bot.flux = this.System.train.bot.flux;
            this.bot.zone("Boutique").level = this.System.train.bot.zones[1].level;
            for (const zone of this.System.train.bot.zones) {
                for (const card_name of zone.cards) {
                    let card = this.bot.getCard(card_name);
                    card.add(zone.name);
                    card.cache = false;
                }
            }
            this.bot.place = this.bot.zone("Lieux").cards[0];

            this.startStep();
        }
        else {
            this.player.life.set(100);
            this.player.ressource("Or").max = 4;
            this.player.flux = 4;

            this.player.getCard("Plaine").add("Lieux");
            this.player.place = this.player.zone("Lieux").cards[0];

            this.player.getCard("Humain").add("Terrain");

            this.chapter = new Chapter(this.System, 0);

            this.nextChapter();
        }
    };

    nextChapter = function () {
        if (this.chapter.number < 50) {
            this.bot = new Entity(this.System);

            let number = this.chapter.number + 1;
            if (number % 10 == 0) {
                this.chapter = this.System.bosses.getRandom(number);
            }
            else {
                this.chapter = this.System.chapters.getRandom(number);
            }

            this.chapter.init();

            this.startChapter();
        }
        else {
            this.victory();
        }
    };

    startChapter = function () {
        this.player.ressource("Or").max++;
        this.player.flux++;

        for (let i = 0; i < 3; i++) {
            this.bot.play();
        }

        this.bot.life.set(this.chapter.steps[0].life);

        this.bot.zone("Lieux").cards = [];
        this.bot.getCard(this.chapter.steps[0].place).add("Lieux");
        this.bot.place = this.bot.zone("Lieux").cards[0];

        this.startStep();
    };

    startStep = function () {
        for (const ressource of this.player.ressources) {
            ressource.current = ressource.max;
        }

        if (this.mode != "Entraînement") {
            this.player.refreshShop();
        }

        for (const entity of [this.player, this.bot]) {
            for (const zone of entity.zones) {
                let cpy = this.System.copy(zone.cards);
                for (const card of cpy) {
                    card.startStepEffect();
                    if (card.type == "Créature") {
                        for (const e of card.equipments) {
                            e.startStepEffect();
                        }
                    }
                }
            }
        }

        if (this.mode == "Entraînement") {
            this.System.pages.change("Game");
        }
        else {
            if (this.chapter.steps[this.player.step - 1].dialogs.length > 0) {
                this.System.pages.change("Dialog");
            }
            else {
                this.System.pages.change("Game");
            }
        }
    };

    endStep = function () {
        this.player.checkPerpetuite();
        this.bot.checkPerpetuite();

        for (const entity of [this.player, this.bot]) {
            for (const zone of entity.zones) {
                let cpy = this.System.copy(zone.cards);
                for (const card of cpy) {
                    for (const stat of card.stats) {
                        stat.step = 0;
                    }
                    for (const trait of card.traits) {
                        trait.step = false;
                    }
                }
            }
        }
    };

    nextStep = function () {
        if (this.mode == "Entraînement") {
            this.startStep();
            this.bot.play();
        }
        else {
            if (this.player.step < this.chapter.steps.length) {
                this.player.step++;

                this.System.game.bot.life.set(this.chapter.steps[this.System.game.player.step - 1].life);

                this.bot.zone("Lieux").cards = [];
                this.bot.getCard(this.chapter.steps[this.System.game.player.step - 1].place).add("Lieux");
                this.bot.place = this.bot.zone("Lieux").cards[0];

                this.startStep();

                this.bot.play();
            }
            else {
                this.nextChapter();
            }
        }
    };

    victory = function () {
        if (this.mode == "Aventure") {
            this.System.account.aventure.victory++;
        }
        else if (this.mode == "Construit") {
            this.System.account.construct.victory++;
        }
        this.deck.victory++;
        this.System.pages.change("Finish");
    };

    defeat = function () {
        if (this.mode == "Aventure") {
            this.System.account.aventure.defeat++;
        }
        else if (this.mode == "Construit") {
            this.System.account.construct.defeat++;
        }
        this.deck.defeat++;
        this.System.pages.change("GameOver");
    };
}