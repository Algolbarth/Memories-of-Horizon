import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class SalleDArmes extends Building {
    name = "Salle d'armes";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Entraînement} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Entraînement").add("Inventaire");
        }
    };
};