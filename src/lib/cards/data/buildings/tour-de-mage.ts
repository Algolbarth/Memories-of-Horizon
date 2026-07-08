import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import type { Card } from '$lib/cards/class/card';

export class TourDeMage extends Building {
    name = "Tour de mage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Mage"]);

        this.stat("Constitution").init(20);

        this.addText(`Quand une carte alliée de famille Sort est posée : Si sur le terrain : Augmente de 1 sa magie.`);
    };

    otherPoseEffect = (card: Card) => {
        if (card.isAlly(this) && card.isFamily("Sort")) {
            this.stat("Magie").increase(1);
        }
    };
};