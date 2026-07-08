import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Mendiant extends Creature {
    name = "Mendiant";

    constructor(system: System) {
        super(system);

        this.init([["Or", 1]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Dépense 2 or.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Or").spend(2);
        }
    };
};