import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Charrette extends Building {
    name = "Charrette";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.stat("Constitution").init(10);

        this.addText(`Quand se prépare sur le terrain : Pioche 5 cartes.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().draw(5);
        }
    };
};