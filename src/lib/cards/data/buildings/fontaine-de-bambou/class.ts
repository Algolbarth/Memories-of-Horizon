import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class FontaineDeBambou extends Building {
    name = "Fontaine de bambou";

    constructor(system: System) {
        super(system);

        this.init([["Or", 18], ["Eau", 18]]);

        this.stat("Constitution").init(10);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Écoulement} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Écoulement").add("Inventaire");
        }
    };
};