import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Silo extends Building {
    name = "Silo";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Meule à grains} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Meule à grains").add("Inventaire");
        }
    };
};