import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class LanceurOrbital extends Building {
    name = "Lanceur orbital";

    constructor(system: System) {
        super(system);

        this.init([["Or", 125]]);

        this.initFamily(["Astronef"]);

        this.stat("Constitution").init(50);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Satellite} sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Satellite").add("Terrain");
        }
    };
};