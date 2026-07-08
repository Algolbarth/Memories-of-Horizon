import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class OursBrun extends Creature {
    name = "Ours brun";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Terre", 20]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(30);
        this.stat("Force").init(30);
        this.stat("Endurance").init(10);
    };
};