import type { Card } from "./class";
import { Creature } from "./creature";
import type { Equipment } from "./equipment";

export class Stat {
    name: string;
    base: number;
    add: number = 0;
    turn: number = 0;
    round: number = 0;
    min: number;
    card: Card;
    debuff: boolean = false;

    constructor(name: string, value: number, min: number, card: Card) {
        this.name = name;
        this.base = value;
        this.min = min;
        this.card = card;
    };

    value = () => {
        let total = this.base + this.add + this.turn + this.round;

        if (this.card instanceof Creature) {
            for (const equipment of this.card.equipments) {
                total += equipment.equipStat(this.name).value();
            }
        }

        if (this.effect != undefined) {
            total = this.effect(total);
        }

        total = this.restriction(total);

        if (total < this.min) {
            total = this.min;
        }

        return total;
    };

    effect: Function | undefined;

    increase = (value: number) => {
        this.add += value;
    };

    decrease = (value: number) => {
        this.add -= value;
    };

    remove = (value: number) => {
        while (value > 0) {
            if (this.round > 0) {
                this.round--;
            }
            else if (this.turn > 0) {
                this.turn--;
            }
            else {
                this.add--;
            }
            value--;
        }
    };

    fix = (value: number) => {
        if (this.value() < value) {
            this.set(value);
        }
    };

    set = (value: number) => {
        this.turn = 0;
        this.round = 0;
        this.add = value - this.base;
    };

    display = () => {
        return this.condition();
    };

    condition = () => {
        if (this.value() > this.min) {
            return true;
        }
        return false;
    };

    init = (value: number) => {
        this.base = value;
    };

    reset = () => {
        this.add = 0;
        this.turn = 0;
        this.round = 0;
    };

    restriction = (total: number) => {
        return total;
    };
};

export class EquipStat extends Stat {
    card: Equipment;

    constructor(name: string, value: number, min: number, card: Equipment) {
        super(name, value, min, card);
        this.card = card;
    };
};