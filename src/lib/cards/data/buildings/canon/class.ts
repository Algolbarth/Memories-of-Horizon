import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Canon extends Building {
    name = "Canon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 80]]);

        this.stat("Constitution").init(10);

        this.addText(`Au début d'une manche : Inflige 50 dégâts spéciaux à l'unité en première position sur le terrain adverse.`);
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            this.adversary().zone("Terrain").cards[0].specialDamage(50, this);
        }
    };
};