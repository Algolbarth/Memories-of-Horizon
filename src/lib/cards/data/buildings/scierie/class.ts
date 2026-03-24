import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Scierie extends Building {
    name = "Scierie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Végétal", 15]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Produit 10 végétal.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Végétal").produce(10);
        }
    };
};