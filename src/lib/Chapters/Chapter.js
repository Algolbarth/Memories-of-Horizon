export class Chapter {
    steps = [];
    ressources = [];
    boss = false;

    constructor(System, number) {
        this.System = System;
        this.number = number;
    };

    init = function () {
        this.System.game.player.step = 1;
        this.System.game.bot.step = 0;

        for (const ressource of this.ressources) {
            this.System.game.bot.ressource(ressource.name).max = ressource.value;
        }
    };

    addRessource = function (name, value) {
        this.ressources.push({
            name: name,
            value: value
        });
    };

    addStep = function (life, place, cards, dialogs = []) {
        this.steps.push({
            life: life,
            place: place,
            cards: cards,
            dialogs: dialogs,
            dialog: 0,
        });
    };

    nextDialog = function () {
        let step = this.steps[this.System.game.player.step - 1];
        if (step.dialog < step.dialogs.length - 1) {
            step.dialog++;
        }
        else {
            this.System.page = "Game";
        }
    };

    getLevel = function () {
        if (this.level == undefined) {
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
}