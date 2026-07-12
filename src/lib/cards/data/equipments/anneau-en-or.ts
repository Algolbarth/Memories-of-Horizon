import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class AnneauEnOr extends Equipment {
    name = "Anneau en or";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Augmente de 2 sa constitution et sa force.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.equipStat("Constitution").increase(2);
            this.equipStat("Force").increase(2);
        }
    };
};