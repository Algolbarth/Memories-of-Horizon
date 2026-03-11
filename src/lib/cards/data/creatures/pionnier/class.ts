import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Text from './text.svelte';

export class Pionnier extends Creature {
    name = "Pionnier";

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
            this.owner().zone("Pile").size += 1;
        }
    };
};