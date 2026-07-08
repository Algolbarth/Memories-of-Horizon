import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class MurDeRonces extends Creature {
    name = "Mur de ronces";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Nature", 25]]);

        this.stat("Constitution").init(50);
        this.stat("Épine").init(10);
        this.stat("Initiative").init(0);
        this.stat("Maîtrise").init(0);

        this.initFamily(["Plante", "Mur"]);
    };
};