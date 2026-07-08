import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BaguetteDeMaleficience extends Equipment {
    name = "Baguette de maléficience";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain: génère {card:Maléfice} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Maléfice").add("Inventaire");
        }
    };
};