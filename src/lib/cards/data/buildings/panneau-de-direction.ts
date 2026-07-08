import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class PanneauDeDirection extends Building {
    name = "Panneau de direction";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.stat("Constitution").init(5);

        this.addText(`Quand votre pile est actualisée : Pioche 1 carte.`);
    };

    refreshStackEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().draw(1);
        }
    };
};