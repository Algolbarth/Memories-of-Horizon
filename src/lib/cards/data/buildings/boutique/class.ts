import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Boutique extends Building {
    name = "Boutique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Restockage} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Restockage").add("Inventaire");
        }
    };
};