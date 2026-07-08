import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Danseuse extends Creature {
    name = "Danseuse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Au début de la phase de combat : Augmente de 1 son esquive pendant ce tour.`);
    };

    startBattleEffect = () => {
        this.stat("Esquive").turn += 1;
    };
};