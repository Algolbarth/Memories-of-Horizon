import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Barbare extends Creature {
    name = "Barbare";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand attaque : Augmente de 5 sa force.`);
    };

    attackEffect = () => {
        this.stat("Force").increase(5);
    };
};