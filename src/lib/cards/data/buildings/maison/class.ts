import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Maison extends Building {
    name = "Maison";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.stat("Constitution").init(20);

        this.addText(`Au début d'une manche : Génère {card:Humain} sur votre terrain.`);
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Humain").add("Terrain");
        }
    };
};