import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class SacEnToile extends Equipment {
    name = "Sac en toile";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Pioche 1 carte.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().draw(1);
        }
    };
};