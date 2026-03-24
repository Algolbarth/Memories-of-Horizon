import type { System } from "../system/class";
import { Deck } from "./class";

export class StandardDeck extends Deck {
    constructor(system: System, name: string, cards: string[]) {
        super(system);

        this.name = name;

        for (const card of this.cards) {
            system.cards.getByName(card);
        }

        for (let i = 0; i < cards.length; i++) {
            let j = i;
            while (j > 0 && cards[j - 1].localeCompare(cards[j], "fr") > 0) {
                let swap = cards[j];
                cards[j] = cards[j - 1];
                cards[j - 1] = swap;
                j--;
            }
        }

        this.cards = cards;
    };

    isEditable = () => {
        return false;
    };

    isPlayable = () => {
        return true;
    };
};