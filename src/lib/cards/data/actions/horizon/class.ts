import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Action } from '$lib/cards/class/action';

export class Horizon extends Action {
    name = "Horizon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 300]]);

        this.addText(`Quand une carte alliée est posée : Si dans la pile : Réduit son coût de 10.`);
        this.addText(`Quand posé : Augmente de 1 la taille de toutes vos zones.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card)) {
            this.costReduce(10);
        }
    };

    useEffect = () => {
        this.owner().zone("Région").size += 1;
        this.owner().zone("Pile").size += 1;
        this.owner().zone("Inventaire").size += 1;
        this.owner().zone("Terrain").size += 1;

        this.move("Défausse");
        this.pose();
    };
};