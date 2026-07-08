import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BagueDeFiancailles extends Equipment {
    name = "Bague de fiançailles";

    constructor(system: System) {
        super(system);

        this.init([["Or", 6]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère une créature du même nom que le porteur sur votre pile.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard(this.bearer.name).add("Pile");
        }
    };
};