import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ManuelDeMagie extends Equipment {
    name = "Manuel de magie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.equipStat("Magie").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère {card:Incantation} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Incantation").add("Inventaire");
        }
    };
};