export class Deck {
    cards = [];
    victory = 0;
    defeat = 0;

    constructor(System) {
        this.System = System;

        this.changeName("Nouveau deck", 0);
    };

    changeName = function (name, number) {
        let newName = name;
        if (number > 0) {
            newName += " (" + number + ")";
        }
        for (const deck of this.System.decks) {
            if (deck != this && deck.name == newName) {
                return this.changeName(name, number + 1);
            }
        }
        this.name = newName;
    };

    canModify = function () {
        if (this.victory > 0 || this.defeat > 0) {
            return false;
        }
        return true;
    };

    add = function (name) {
        if (!this.check(name)) {
            this.cards.push(name);
            this.System.pages.change("Add");
        }
    };

    remove = function (name) {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i] == name) {
                this.cards.splice(i, 1);
            }
        }
    };

    check = function (name) {
        for (const card of this.cards) {
            if (card == name) {
                return true;
            }
        }
        return false;
    };

    clone = function () {
        let deck = new Deck(this.System);
        deck.changeName(this.name, 0);
        for (const card of this.cards) {
            deck.add(card);
        }
        this.System.decks.push(deck);
        this.System.pages.change("Decks");
    };

    delete = function () {
        for (let i = 0; i < this.System.decks.length; i++) {
            if (this.System.decks[i].name == this.name) {
                this.System.decks.splice(i, 1);
            }
        }
        this.System.deck = undefined;
        this.System.pages.change("Decks");
    };

    playable = function () {
        for (const card of this.cards) {
            if (this.System.cards.getByName(card).level == 1) {
                return true;
            }
        }
        return false;
    };

    code = function () {
        let code = this.name + "_";
        for (const card of this.cards) {
            code += card + "_";
        }
        return code;
    };
}