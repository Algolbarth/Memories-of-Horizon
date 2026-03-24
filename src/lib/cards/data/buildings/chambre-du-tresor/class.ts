import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class ChambreDuTresor extends Building {
    name = "Chambre du trésor";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Trésor} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Trésor").add("Inventaire");
        }
    };
};