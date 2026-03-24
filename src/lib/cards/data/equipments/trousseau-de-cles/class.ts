import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class TrousseauDeCles extends Equipment {
    name = "Trousseau de clés";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère {card:Clé en or} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Clé en or").add("Inventaire");
        }
    };
};