import type { Card } from "./card";
import { Creature } from "./creature";
import type { Equipment } from "./equipment";

export class Trait {
    name: string;
    base: boolean;
    add: boolean = false;
    turn: boolean = false;
    round: boolean = false;
    card: Card;

    constructor(name: string, value: boolean, card: Card) {
        this.name = name;
        this.base = value;
        this.card = card;
    };

    value = () => {
        let total = this.base || this.add || this.turn || this.round;

        if (this.card instanceof Creature) {
            for (const equipment of this.card.equipments) {
                total = total || equipment.equipTrait(this.name).value();
            }
        }

        return total;
    };

    display = () => {
        return this.condition();
    };

    condition = () => {
        return this.value();
    };

    init = (value: boolean) => {
        this.base = value;
    };
};

export class EquipTrait extends Trait {
    card: Equipment;

    constructor(name: string, value: boolean, card: Equipment) {
        super(name, value, card);
        this.card = card;
    };
};