import type { Card } from "$lib/cards/class/card";

export class Zone {
    name: string;
    size: number | undefined;
    cards: Card[] = [];

    constructor(name: string, size: number | undefined = undefined) {
        this.name = name;
        this.size = size;
    };

    isFull = () => {
        return this.cards.length == this.size;
    };

    isNotFull = () => {
        return !this.isFull();
    };

    increase = (value: number) => {
        if (this.size != undefined) {
            this.size += value;
        }
    };

    decrease = (value: number) => {
        if (this.size != undefined) {
            this.size -= value;

            if (this.size <= 0) {
                this.size = 1;
            }
        }
    };
};