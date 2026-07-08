import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class GrandCarquois extends Equipment {
    name = "Grand carquois";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère {card:Pluie de flèche} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Pluie de flèche").add("Inventaire");
        }
    };
};