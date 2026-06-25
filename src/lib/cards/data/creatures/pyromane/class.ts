import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Pyromane extends Creature {
    name = "Pyromane";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Feu", 12]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(10);

        this.addText(`Quand attaque : Augmente de 3 la brûlure de l'unité attaquée.`);
    };

    attackEffect = (defender: Unit) => {
        defender.stat("Brûlure").increase(3);
    };
};