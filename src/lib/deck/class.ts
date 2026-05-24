import type { Card } from "$lib/cards/class/card";
import type { System } from "$lib/system/class";

export class Deck {
    name: string;
    mode: string;
    cards: string[] = [];
    victory: number = 0;
    defeat: number = 0;
    system: System;
    levels: [string, number][] = [];
    most_popular_level: number = 0;
    elements: [string, number][] = [];
    types: [string, number][] = [
        ["Créature", 0],
        ["Bâtiment", 0],
        ["Action", 0],
        ["Objet", 0],
        ["Lieu", 0],
    ];

    constructor(system: System, mode: string) {
        this.system = system;
        this.mode = mode;

        this.name = this.changeName("Nouveau deck", 0);

        for (let i = 1; i <= 20; i++) {
            this.levels.push(["" + i, 0]);
        }
        for (const element of this.system.ressources.list) {
            if (!["Or", "Mana", "Flux"].includes(element.name)) {
                this.elements.push([element.name, 0]);
            }
            else if (element.name == "Or") {
                this.elements.push(["Neutre", 0]);
            }
        }
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
        if (!this.checkDuplicate(name)) {
            this.cards.push(name);
            this.setCategories();
        }
    };

    addList = (name_list: string[]) => {
        for (const name of name_list) {
            if (!this.checkDuplicate(name)) {
                this.cards.push(name);
            }
        }

        this.setCategories();
    };

    setCategories = () => {
        this.resetCategories();

        for (const card_name of this.cards) {
            let card: Card = this.system.cards.getByName(card_name);

            for (const level of this.levels) {
                if (card.level == parseInt(level[0])) {
                    level[1] += 1;

                    if (level[1] > this.most_popular_level) {
                        this.most_popular_level = level[1];
                    }
                }
            }

            for (const element of this.elements) {
                if (card.isElement(element[0])) {
                    element[1] += 1;
                }
            }

            for (const type of this.types) {
                if (type[0] == card.type) {
                    type[1] += 1;
                }
            }
        }
    };

    resetCategories = () => {
        for (const level of this.levels) {
            level[1] = 0;
        }
        this.most_popular_level = 0;
        for (const element of this.elements) {
            element[1] = 0;
        }
        for (const type of this.types) {
            type[1] = 0;
        }
    };

    remove = (name: string) => {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i] == name) {
                this.cards.splice(i, 1);
            }
        }
    };

    checkDuplicate = (name: string) => {
        for (const card of this.cards) {
            if (card == name) {
                return true;
            }
        }
        return false;
    };

    clone = () => {
        let deck = new Deck(this.system, "wild");
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