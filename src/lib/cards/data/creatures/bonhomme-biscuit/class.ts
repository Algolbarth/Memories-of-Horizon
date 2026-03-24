import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class BonhommeBiscuit extends Creature {
    name = "Bonhomme biscuit";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Nourriture"]);

        this.stat("Constitution").init(1);
        this.stat("Force").init(1);

        this.addText(`Quand un objet de famille Nourriture est utilisé sur lui : Augmente de 5 sa constitution et sa force.`);
    };

    targetEffect = (card: Card) => {
        if (this.isArea("Terrain") && card.isFamily("Nourriture")) {
            this.stat("Constitution").increase(5);
            this.stat("Force").increase(5);
        }
    };
};