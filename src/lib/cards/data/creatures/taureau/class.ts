import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Taureau extends Creature {
    name = "Taureau";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);
        this.stat("Adresse").init(25);
    };
};