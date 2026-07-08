import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BagueDeMana extends Equipment {
    name = "Bague de mana";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Augmente de 1 la magie du porteur.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Magie").increase(1);
        }
    };
};