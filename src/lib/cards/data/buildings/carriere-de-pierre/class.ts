import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class CarriereDePierre extends Building {
    name = "Carrière de pierre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Terre", 15]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Produit 10 terre.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Terre").produce(10);
        }
    };
};