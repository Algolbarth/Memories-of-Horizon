import { Card } from '$lib/cards/class/card';
import { Unit } from '$lib/cards/class/unit';
import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import { Creature } from '$lib/cards/class/creature';

export class LacDeLave extends Building {
    name = "Lac de lave";

    constructor(system: System) {
        super(system);

        this.init([["Or", 18], ["Feu", 18]]);

        this.stat("Constitution").init(10);

        this.addText(`Quand une créature d'élément Feu est posée : Augmente de 5 la force de cette créature.`);
        this.addText(`Quand une unité qui n'est pas d'élément Feu est posée : Inflige 5 dégâts spéciaux à cette unité.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Unit) {
            if (card.isElement("Feu") && card instanceof Creature) {
                card.stat("Force").increase(5);
            }
            else {
                card.specialDamage(5, this);
            }
        }
    };
};