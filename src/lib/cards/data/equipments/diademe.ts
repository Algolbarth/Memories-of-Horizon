import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class Diademe extends Equipment {
    name = "Diadème";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Augmente de 50 la constitution et la force du porteur.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Constitution").increase(50);
            this.bearer.stat("Force").increase(50);
        }
    };
};