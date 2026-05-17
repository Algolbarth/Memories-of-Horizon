import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class TourDeSiege extends Building {
    name = "Tour de siège";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.stat("Constitution").init(20);

        this.addText(`Au début d'une manche : Augmente de 10 la constitution et la force de la créature sur votre terrain la plus en avant.`);
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            let target = undefined;
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);

            for (const card of battlefield) {
                if (target == undefined && card instanceof Creature) {
                    target = card;
                }
            }

            if (target != undefined) {
                target.stat("Force").increase(10);
                target.stat("Constitution").increase(10);
            }
        }
    };
};