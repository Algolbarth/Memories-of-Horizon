import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class SerpentArboricole extends Creature {
    name = "Serpent arboricole";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Nature", 12]]);

        this.initFamily(["Reptile"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand attaque une créature : Augmente de 1 le poison de la créature attaquée.`,
            `Augmente de 5 la toxicité de la créature attaquée pendant ce tour.`]);
    };

    fightEffect = (defender: Unit) => {
        if (defender instanceof Creature) {
            defender.stat("Poison").increase(1);
            defender.stat("Toxicité").turn += 5;
        }
    };
};