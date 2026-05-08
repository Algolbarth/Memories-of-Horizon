import { deleteDuplicate } from "$lib/utils";
import type { Card } from "./card";
import { Creature } from "./creature";

export class Families {
    base: string[] = [];
    add: string[] = [];
    turn: string[] = [];
    round: string[] = [];
    card: Card;

    constructor(card: Card) {
        this.card = card;
    };

    total = () => {
        let array = [];

        for (const b of this.base) {
            array.push(b);
        }
        for (const a of this.add) {
            array.push(a);
        }
        for (const s of this.turn) {
            array.push(s);
        }
        for (const t of this.round) {
            array.push(t);
        }

        if (this.card instanceof Creature) {
            for (const e of this.card.equipments) {
                for (const i of e.equipFamilies) {
                    array.push(i);
                }
            }
        }

        array = deleteDuplicate(array);

        return array;
    };
};