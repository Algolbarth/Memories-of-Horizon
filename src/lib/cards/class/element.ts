import { deleteDuplicate } from "$lib/utils";
import type { Card } from "./card";
import { Creature } from "./creature";

export class Elements {
    base: string[] = [];
    add: string[] = [];
    turn: string[] = [];
    round: string[] = [];
    card: Card;

    constructor(card: Card) {
        this.card = card;
    };

    total = () => {
        let array: string[] = [];
        for (const b of this.base) {
            array.push(b);
        }
        for (const a of this.add) {
            array.push(a);
        }

        if (this.card instanceof Creature) {
            for (const e of this.card.equipments) {
                for (const i of e.equipElements) {
                    array.push(i);
                }
            }
        }

        array = deleteDuplicate(array);

        return array;
    };
};