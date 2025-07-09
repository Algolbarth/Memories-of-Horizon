export class Account {
    aventure = new Gamemode();
    construct = new Gamemode();

    constructor(System, name) {
        this.System = System;
        this.name = name;
    };

    total_victory = function () {
        return this.aventure.victory + this.construct.victory;
    };

    total_defeat = function () {
        return this.aventure.defeat + this.construct.defeat;
    };

    total_match = function () {
        return this.aventure.total() + this.construct.total();
    };
}

class Gamemode {
    victory = 0;
    defeat = 0;

    total() {
        return this.victory + this.defeat;
    };
}