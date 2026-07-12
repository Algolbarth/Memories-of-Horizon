import type { Card } from "./card";

export class Cost {
    name: string;
    base: number = 0;
    add: number = 0;
    turn: number = 0;
    card: Card;

    constructor(name: string, card: Card) {
        this.name = name;
        this.card = card;
    };

    value = () => {
        let total = this.base + this.add + this.turn;
        return total;
    };

    increase = (value: number) => {
        this.add += value;
    };

    decrease = (value: number) => {
        this.add -= value;
    };

    reset = () => {
        this.add = 0;
        this.turn = 0;
    };

    fix = (value: number) => {
        this.add = value - this.base;
        this.turn = 0;
    };
};