import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Building } from '$lib/cards/class/building';
import { Creature } from '$lib/cards/class/creature';

export class BibliothequeElfique extends Building {
    name = "Bibliothèque elfique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Nature", 25]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(20);

        this.addText(`Quand une créature de famille Elfe est posée : Si sur le terrain : Augmente de 1 son intelligence.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Creature && card.isFamily("Elfe")) {
            this.stat("Intelligence").increase(1);
        }
    };
};