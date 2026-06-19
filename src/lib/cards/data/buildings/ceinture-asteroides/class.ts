import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class CeintureDAsteroides extends Building {
    name = "Ceinture d'astéroïdes";

    constructor(system: System) {
        super(system);

        this.init([["Or", 150]]);

        this.stat("Constitution").init(100);
        this.stat("Épine").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Météore} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Météore").add("Inventaire");
        }
    };
};