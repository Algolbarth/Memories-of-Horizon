import type { System } from "$lib/system/class";
import { Deck } from "./class";

export class StandardDeck extends Deck {
    constructor(system: System, name: string, cards: string[]) {
        super(system, "standard");

        this.name = name;

        for (let i = 0; i < cards.length; i++) {
            let card = system.cards.getByName(cards[i]);
            if (card.name == cards[i]) {
                let j = i;
                while (j > 0 && cards[j - 1].localeCompare(cards[j], "fr") > 0) {
                    let swap = cards[j];
                    cards[j] = cards[j - 1];
                    cards[j - 1] = swap;
                    j--;
                }
            }
            else {
                console.log(cards[i] + " n'est pas une carte existante dans le deck " + name);
                cards.splice(i, 1);
                i--;
            }
        }

        this.addList(cards);
    };

    isEditable = () => {
        return false;
    };

    isPlayable = () => {
        return true;
    };
};