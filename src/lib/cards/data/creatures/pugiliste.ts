import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Lutteur extends Creature {
    name = "Lutteur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Terre", 15]]);

        this.initFamily(["Nain"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(5);

        this.addText(`Au début d'une manche : Augmente d'autant son endurance pendant cette manche que 5 fois le numéro de la manche.`);
    };

    roundEffect = () => {
        this.stat("Endurance").round += this.system.game.round * 5;
    };
};