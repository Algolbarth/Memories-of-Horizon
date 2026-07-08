import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import { copy } from '$lib/utils';
import type { Unit } from '$lib/cards/class/unit';

export class Couronne extends Equipment {
    name = "Couronne";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Augmente de 5 la constitution et la force du porteur pour chaque créature sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    this.bearer.stat("Constitution").increase(5);
                    this.bearer.stat("Force").increase(5);
                }
            }
        }
    };
};