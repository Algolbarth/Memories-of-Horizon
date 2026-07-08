import type { Card } from "$lib/cards/class/card";
import type { Entity } from "./entity";

export class Zone {
    name: string;
    size: number | undefined;
    cards: Card[] = [];
    entity: Entity;

    constructor(entity: Entity, name: string, size: number | undefined = undefined) {
        this.name = name;
        this.size = size;
        this.entity = entity;
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