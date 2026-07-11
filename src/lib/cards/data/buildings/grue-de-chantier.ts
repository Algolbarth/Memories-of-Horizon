import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import type { Unit } from '$lib/cards/class/unit';

export class GrueDeChantier extends Building {
    name = "Grue de chantier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Terre", 25]]);

        this.stat("Constitution").init(40);

        this.addText(`Au début d'une manche : Si sur le terrain : Augmente de 20 la constitution du bâtiment sur votre terrain le plus en avant.`);
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            let target = undefined;
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);

            for (const card of battlefield) {
                if (target == undefined && card instanceof Building) {
                    target = card;
                }
            }

            if (target != undefined) {
                target.stat("Constitution").increase(20);
            }
        }
    };
};