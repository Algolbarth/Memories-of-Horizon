import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class LoupDesMontagnes extends Creature {
    name = "Loup des montagnes";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Terre", 8]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(15);

        this.addText(`Quand attaque une unité ayant une endurance nulle : Augmente de 5 sa force.`);
    };

    fightEffect = (defender: Unit) => {
        if (defender.stat("Endurance").value() > 0) {
            this.stat('Force').increase(5);
        }
    };
};