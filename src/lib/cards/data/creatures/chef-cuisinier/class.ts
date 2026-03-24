import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class ChefCuisinier extends Creature {
    name = "Chef cuisinier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 85]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand une carte alliée de famille Nourriture est posée : Si sur le terrain : Produit 10 ressources de chaque élément de cette carte.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card.isFamily("Nourriture") && this.isAlly(card)) {
            for (const e of card.elements.total()) {
                if (e != "Neutre") {
                    this.owner().ressource(e).produce(10);
                }
                else {
                    this.owner().ressource("Or").produce(10);
                }
            }
        }
    };
};