import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Scierie extends Building {
    name = "Scierie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Nature", 15]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Produit 10 nature.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Nature").produce(10);
        }
    };
};