import type { Entity } from "./entity";
import { Zone } from "./zone";

export class Stack extends Zone {
    base_level: number = 1;
    turn_level: number = 0;
    upgrade_cost: number = 10;

    constructor(entity: Entity) {
        super(entity, "Pile", 10);
    };

    level = () => {
        let total: number = this.base_level + this.turn_level;

        if (total <= 0) {
            total = 1;
        }

        return total;
    };
};