import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class SacDeBombe extends Equipment {
    name = "Sac de bombe";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère {card:Bombe} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Bombe").add("Inventaire");
        }
    };
};