import type { System } from '$lib/system/class';
import { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class TheoricienDuComplot extends Creature {
    name = "Théoricien du complot";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Feu", 12]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(10);

        this.addText(`Quand une carte alliée est meulée : Si sur le terrain : Produit 1 or et 1 feu.`);
    };

    otherMillEffect = (card: Card) => {
        if (this.isArea("Terrain") && this.isAlly(card)) {
            this.owner().ressource("Or").produce(1);
            this.owner().ressource("Feu").produce(1);
        }
    };
};