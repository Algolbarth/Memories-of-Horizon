import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Vipere extends Creature {
    name = "Vipère";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Reptile"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(3);

        this.addText([
            `Quand attaque une créature : Augmente de 1 le poison de la créature attaquée.`,
            `Augmente de 1 la toxicité de la créature attaquée pendant ce tour.`]);
    };

    attackEffect = (defender: Unit) => {
        if (defender instanceof Creature) {
            defender.stat("Poison").increase(1);
            defender.stat("Toxicité").turn += 1;
        }
    };
};