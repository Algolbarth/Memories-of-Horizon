import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Souris extends Creature {
    name = "Souris";

    constructor(system: System) {
        super(system);

        this.init([["Or", 2]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
    };
};