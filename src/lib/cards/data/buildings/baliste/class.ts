import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Baliste extends Building {
    name = "Baliste";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.stat("Constitution").init(20);

        this.addText(`Au début d'une manche : Inflige 20 dégâts spéciaux à l'unité en première position sur le terrain adverse.`);
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            this.adversary().zone("Terrain").cards[0].specialDamage(20, this);
        }
    };
};