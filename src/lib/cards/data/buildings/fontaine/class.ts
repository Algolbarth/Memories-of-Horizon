import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Building } from '$lib/cards/class/building';

export class Fontaine extends Building {
    name = "Fontaine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Eau", 10]]);

        this.stat("Constitution").init(10);

        this.addText(`Quand une autre carte d'élément Eau alliée est posée : Si sur le terrain : Pioche 1 carte.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card.isElement("Eau") && this.isAlly(card)) {
            this.owner().draw(1);
        }
    };
};