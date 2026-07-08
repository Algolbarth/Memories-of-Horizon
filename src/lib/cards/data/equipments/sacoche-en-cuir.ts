import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class SacocheEnCuir extends Equipment {
    name = "Sacoche en cuir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Découvre 2 cartes.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().discover(2);
        }
    };
};