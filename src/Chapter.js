export class Chapter {
    steps = [];
    ressources = [];
    boss = false;
    dialog = 0;

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
            dialogs: dialogs
        });
    };

    nextDialog = function () {
        if (this.dialog < this.steps[this.System.game.player.step - 1].dialogs.length - 1) {
            this.dialog++;
            this.System.pages.change("Dialog");
        }
        else {
            this.System.pages.change("Game");
        }
    };

    getLevel = function () {
        let total = 0;
        for (const ressource of this.ressources) {
            total += ressource.value;
        }

        let level = 0;
        let max = 0;
        while (total > max && level < 20) {
            level++;
            max += level * 10;
        }
        return level;
    };
}