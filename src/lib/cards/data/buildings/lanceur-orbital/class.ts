import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class LanceurOrbital extends Building {
    name = "Lanceur orbital";

    constructor(system: System) {
        super(system);

        this.init([["Or", 150]]);

        this.initFamily(["Spatial"]);

        this.stat("Constitution").init(100);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Satellite} sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Satellite").add("Terrain");
        }
    };
};