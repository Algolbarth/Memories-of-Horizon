import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class GarnisonDesMonts extends Building {
    name = "Garnison des monts";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Terre", 50]]);

        this.stat("Constitution").init(20);

        this.addText(`Au début d'une manche : Si sur le terrain : Génère {card:Soldat nain} sur votre terrain.`);
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Soldat nain").add("Terrain");
        }
    };
};