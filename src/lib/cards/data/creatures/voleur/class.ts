import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Voleur extends Creature {
    name = "Voleur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand attaque : Augmente de 5 sa vente en or.`);
    };

    attackEffect = () => {
        this.getSale("Or").increase(5);
    };
};