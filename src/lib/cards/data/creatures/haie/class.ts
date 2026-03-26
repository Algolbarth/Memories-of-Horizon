import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Haie extends Creature {
    name = "Haie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Végétal", 8]]);

        this.stat("Constitution").init(30);
        this.stat("Initiative").init(0);
        this.stat("Maîtrise").init(0);

        this.initFamily(["Plante", "Mur"]);
    };
};