import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BatonDeRelais extends Equipment {
    name = "Bâton de relais";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère {card:Relais} dans l'inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Relais").add("Inventaire");
        }
    };
};