import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Text from './text.svelte';

export class CommissairePriseur extends Creature {
    name = "Commissaire priseur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 105]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.text = Text;
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let inventory = copy(this.owner().zone("Inventaire").cards);
            for (const card of inventory) {
                card.getSale("Or").increase(10);
            }
        }
    };
};