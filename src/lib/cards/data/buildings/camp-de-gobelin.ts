import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class CampDeGobelin extends Building {
    name = "Camp de gobelin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Feu", 12]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(20);

        this.addText(`Au début d'une manche : Si sur le terrain : Génère {card:Gobelin} sur votre terrain.`);
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Gobelin").add("Terrain");
        }
    };
};