import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Officine extends Building {
    name = "Officine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Potion de soin} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Potion de soin").add("Inventaire");
        }
    };
};