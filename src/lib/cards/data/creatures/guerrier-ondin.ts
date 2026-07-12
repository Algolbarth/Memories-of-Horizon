import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class GuerrierOndin extends Creature {
    name = "Guerrier ondin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Eau", 25]]);

        this.initFamily(["Ondin"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);
        this.stat("Endurance").init(5);

        this.addText(`Quand attaque : Stocke 5 eau.`);
    };

    attackEffect = () => {
        this.owner().ressource("Eau").stock(5);
    };
};