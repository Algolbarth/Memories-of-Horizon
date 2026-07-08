import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Caserne extends Building {
    name = "Caserne";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.stat("Constitution").init(20);

        this.addText(`Au début d'une manche : Génère {card:Soldat} sur votre terrain.`);
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Soldat").add("Terrain");
        }
    };
};