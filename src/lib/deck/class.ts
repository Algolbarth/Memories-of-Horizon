import type { System } from "$lib/system/class";

export class Deck {
    name: string;
    cards: string[] = [];
    victory: number = 0;
    defeat: number = 0;
    system: System;

    constructor(system: System) {
        this.system = system;

        this.name = this.changeName("Nouveau deck", 0);
    };

    changeName = (name: string, iterations: number): string => {
        let newName: string = name;
        if (iterations > 0) {
            newName += " (" + iterations + ")";
        }

        for (const deck of this.system.wild_decks) {
            if (deck != this && deck.name == newName) {
                return this.changeName(name, iterations + 1);
            }
        }

        this.name = newName;

        return newName;
    };

    isEditable = () => {
        if (this.victory > 0 || this.defeat > 0) {
            return false;
        }
        return true;
    };

    add = (name: string) => {
        if (!this.check(name)) {
            this.cards.push(name);
        }
    };

    remove = (name: string) => {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i] == name) {
                this.cards.splice(i, 1);
            }
        }
    };

    check = (name: string) => {
        for (const card of this.cards) {
            if (card == name) {
                return true;
            }
        }
        return false;
    };

    clone = () => {
        let deck = new Deck(this.system);
        deck.changeName("Clone de " + this.name, 0);
        for (const card of this.cards) {
            deck.add(card);
        }
        this.system.wild_decks.push(deck);
        return deck;
    };

    delete = () => {
        for (let i = 0; i < this.system.wild_decks.length; i++) {
            if (this.system.wild_decks[i].name == this.name) {
                this.system.wild_decks.splice(i, 1);
            }
        }
        this.system.deck = undefined;
    };

    isPlayable = () => {
        for (const card of this.cards) {
            if (this.system.cards.getByName(card).level == 1) {
                return true;
            }
        }
        return false;
    };

    code = () => {
        let code = this.name + "_";
        for (const card of this.cards) {
            code += card + "_";
        }
        return code;
    };
};