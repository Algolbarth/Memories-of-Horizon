import { Deck } from "$lib/deck/class";
import type { Game } from "$lib/game/class";
import type { System } from "$lib/system/class";

export class Chapter {
    steps: Step[] = [];
    step: Step;
    step_slot: number = 0;
    ressources: ChapterRessource[] = [];
    is_boss: boolean = false;
    system: System;
    game: Game;
    number: number;
    level: number = 0;

    constructor(system: System, game: Game, number: number) {
        this.system = system;
        this.game = game;
        this.number = number;
        this.step = new Step(0, [], 0, [], [], new Deck(system, "chapter"));
    };

    init = () => {
        this.step = this.steps[0];

        for (const ressource of this.ressources) {
            this.game.bot.ressource(ressource.name).production = ressource.value;
        }
    };

    nextStep = () => {
        this.step_slot += 1;
        this.step = this.steps[this.step_slot];
    };

    addRessource = (name: string, value: number) => {
        this.ressources.push(new ChapterRessource(name, value));
    };

    addStep = (life: number, locations: string[], zone_size: number, deck: Deck, cards: string[], dialogs: string[] = []) => {
        this.steps.push(new Step(life, locations, zone_size, cards, dialogs, deck));
    };

    startDialog = () => {
        if (!this.step.read && this.step.dialog < this.step.dialogs.length) {
            this.system.page = "Scenario";
        }
        else {
            this.step.read = true;
            this.system.page = "Game";
        }
    };

    nextDialog = () => {
        if (!this.step.read && this.step.dialog < this.step.dialogs.length - 1) {
            this.step.dialog++;
            this.system.page = "Scenario";
        }
        else {
            this.step.read = true;
            this.system.page = "Game";
        }
    };

    getLevel = () => {
        if (this.level == 0) {
            let total = 0;
            for (const ressource of this.ressources) {
                total += ressource.value;
            }

            let level = 1;
            let array = [
                10,
                25,
                50,
                75,
                100,
                150,
                200,
                250,
                325,
                400,
                500,
                600,
                700,
                850,
                1000,
                1250,
                1500,
                2000,
                2500,
                3000
            ];

            while (total > array[level - 1] && level < 20) {
                level++;
            }

            return level;
        }
        else {
            return this.level;
        }
    };
};

export class Step {
    life: number;
    locations: string[];
    zone_size: number;
    cards: string[];
    dialogs: string[];
    dialog: number = 0;
    read: boolean = false;
    deck: Deck;

    constructor(life: number, locations: string[], zone_size: number, cards: string[], dialogs: string[], deck: Deck) {
        this.life = life;
        this.locations = locations;
        this.zone_size = zone_size;
        this.cards = cards;
        this.dialogs = dialogs;
        this.deck = deck;
    };
};

class ChapterRessource {
    name: string;
    value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    };
};