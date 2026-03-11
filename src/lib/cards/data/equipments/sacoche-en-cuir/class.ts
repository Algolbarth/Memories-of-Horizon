import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';
import Text from './text.svelte';

export class SacocheEnCuir extends Equipment {
    name = "Sacoche en cuir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.text = Text;
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().discover(2);
        }
    };
};