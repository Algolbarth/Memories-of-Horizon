import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class BelierDeCombat extends Building {
    name = "Bélier de combat";

    constructor(system: System) {
        super(system);

        this.init([["Or", 170]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Démolition} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Démolition").add("Inventaire");
        }
    };
};