import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';
import { copy } from '$lib/utils';

export class ElementaireDesVagues extends Creature {
    name = "Élémentaire des vagues";

    constructor(system: System) {
        super(system);

        this.init([["Eau", 125]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.addText(`Quand attaque : [source {25, Inflige 10 dégâts à toutes les unités sur le terrain adverse.}]`);
    };

    attackEffect = () => {
        if (this.owner().ressource("Eau").total() >= 25) {
            this.owner().ressource("Eau").spend(25);

            let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
            for (const card of adversary_battlefield) {
                card.specialDamage(10, this);
            }
        }
    };
};