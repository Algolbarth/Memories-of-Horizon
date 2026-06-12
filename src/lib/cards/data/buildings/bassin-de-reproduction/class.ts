import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class BassinDeReproduction extends Building {
    name = "Bassin de reproduction";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Eau", 15]]);

        this.initFamily(["Ondin"]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Ondin} sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Ondin").add("Terrain");
        }
    };
};