import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class Senateur extends Creature {
    name = "Sénateur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 22], ["Eau", 22]]);

        this.initFamily(["Ondin"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand une autre créature alliée de famille Ondin est posée : Si sur le terrain : Produit 5 eau.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Creature && card.isFamily("Ondin") && this.isAlly(card)) {
            this.owner().ressource("Eau").produce(5);
        }
    };
};