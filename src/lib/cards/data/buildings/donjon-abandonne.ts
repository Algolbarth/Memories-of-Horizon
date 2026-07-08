import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class DonjonAbandonne extends Building {
    name = "Donjon abandonné";

    constructor(system: System) {
        super(system);

        this.init([["Or", 120]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Monstre errant} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Monstre errant").add("Inventaire");
        }
    };
};