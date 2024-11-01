export class Account {
    aventure = {
        victory: 0,
        defeat: 0,
        total: function () {
            return this.victory + this.defeat;
        }
    };
    construct = {
        victory: 0,
        defeat: 0,
        total: function () {
            return this.victory + this.defeat;
        }
    };

    constructor(System, name) {
        this.System = System;
        this.name = name;
    };

    victory = function () {
        return this.aventure.victory + this.construct.victory;
    };

    defeat = function () {
        return this.aventure.defeat + this.construct.defeat;
    };

    matchs = function () {
        return this.aventure.total() + this.construct.total();
    };
}