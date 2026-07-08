import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Herisson extends Creature {
    name = "Hérisson";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5], ["Nature", 5]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(3);
        this.stat("Épine").init(3);
    };
};