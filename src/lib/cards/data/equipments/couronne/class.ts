import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import Text from './text.svelte';
import { copy } from '$lib/utils';

export class Couronne extends Equipment {
    name = "Couronne";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.text = Text;
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            let battlefield = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    this.bearer.stat("Constitution").increase(5);
                    this.bearer.stat("Force").increase(5);
                }
            }
        }
    };
};