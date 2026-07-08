import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Etable extends Building {
    name = "Étable";

    constructor(system: System) {
        super(system);

        this.init([["Or", 60]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Cheval} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Cheval").add("Inventaire");
        }
    };
};