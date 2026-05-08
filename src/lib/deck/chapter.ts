import type { System } from "$lib/system/class";
import { Deck } from "./class";

export class ChapterDeck extends Deck {
    constructor(system: System, name: string, cards: string[]) {
        super(system);

        this.name = name;

        for (const card of this.cards) {
            system.cards.getByName(card);
        }

        this.cards = cards;
    };
};