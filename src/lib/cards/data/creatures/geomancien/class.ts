import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';

export class Geomancien extends Creature {
    name = "Géomancien";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Terre", 12]]);

        this.initFamily(["Nain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Endurance").init(3);

        this.addText(`Quand une autre carte alliée d'élément Terre est posée : Si sur le terrain : Augmente de 2 son endurance.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card.isElement("Terre") && this.isAlly(card)) {
            this.stat("Endurance").increase(2);
        }
    };
};