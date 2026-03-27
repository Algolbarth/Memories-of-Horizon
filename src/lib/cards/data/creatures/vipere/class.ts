import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Vipere extends Creature {
    name = "Vipère";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Végétal", 12]]);

        this.initFamily(["Reptile"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand attaque une créature : Augmente de 3 la toxicité de la créature attaquée.`);
    };

    fightEffect = (defender: Unit) => {
        defender.stat("Toxicité").increase(3);
    };
};