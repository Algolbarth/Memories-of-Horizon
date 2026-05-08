import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Building } from '$lib/cards/class/building';

export class Siphon extends Building {
    name = "Siphon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Eau", 15]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand une autre carte d'élément Eau alliée est posée : Si sur le terrain : Augmente de 5 sa vente en eau.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card.isElement("Eau") && this.isAlly(card)) {
            this.getSale("Eau").increase(5);
        }
    };
};