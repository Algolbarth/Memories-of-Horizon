import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Building } from '$lib/cards/class/building';

export class Cascade extends Building {
    name = "Cascade";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Eau", 15]]);

        this.stat("Constitution").init(10);

        this.addText(`Quand une autre carte d'élément Eau alliée est posée : Si sur le terrain : Pioche 1 carte Eau.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card.isElement("Eau") && this.isAlly(card)) {
            let readCondition = (card: Card) => {
                if (card.isElement("Eau")) {
                    return true;
                }
                return false;
            };
            this.owner().draw(1, readCondition);
        }
    };
};