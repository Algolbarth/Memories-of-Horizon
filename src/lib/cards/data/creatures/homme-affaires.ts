import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class HommeDAffaires extends Creature {
    name = "Homme d'affaires";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand une autre carte alliée est vendue : Produit 5 or.`);
    };

    otherSellEffect = (card: Card) => {
        if (this.isArea("Terrain") && this.isAlly(card)) {
            this.owner().ressource("Or").produce(5);
        }
    };
};