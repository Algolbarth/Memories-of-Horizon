import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class SacSansFond extends Equipment {
    name = "Sac sans fond";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Augmente de 1 la taille de votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().zone("Inventaire").size += 1;
        }
    };
};