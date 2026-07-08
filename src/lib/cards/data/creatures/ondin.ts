import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Ondin extends Creature {
    name = "Ondin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5], ["Eau", 5]]);

        this.initFamily(["Ondin"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand arrive sur le terrain : Produit 5 eau.`);
    };

    addEffect = (zone: string) => {
        if (zone == "Terrain") {
            this.owner().ressource("Eau").produce(5);
        }
    };
};