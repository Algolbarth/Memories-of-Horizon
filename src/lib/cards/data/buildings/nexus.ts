import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Building } from '$lib/cards/class/building';
import { Creature } from '$lib/cards/class/creature';

export class Nexus extends Building {
    name = "Nexus";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(40);

        this.addText(`Quand une créature alliée de famille Élémentaire est posée : Si sur le terrain : Augmente de 1 votre production de ressources de chaque élément de cette créature.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Creature && card.isFamily("Élémentaire")) {
            for (const element of card.elements.total()) {
                if (element != "Neutre") {
                    this.owner().ressource(element).increase(1);
                }
                else {
                    this.owner().ressource("Or").increase(1);
                }
            }
        }
    };
};