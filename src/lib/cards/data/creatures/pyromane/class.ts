import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Pyromane extends Creature {
    name = "Pyromane";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Feu", 20]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand attaque : Augmente de 5 la brûlure de l'unité attaquée.`);
    };

    fightEffect = (defender: Unit) => {
        defender.stat("Brûlure").increase(5);
    };
};