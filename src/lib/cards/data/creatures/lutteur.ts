import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Pugiliste extends Creature {
    name = "Pugiliste";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Feu", 15]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(5);

        this.addText(`Au début d'une manche : Si sur le terrain : Augmente d'autant sa force pendant cette manche que 10 fois le numéro de la manche.`);
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            this.stat("Force").round += this.system.game.round * 10;
        }
    };
};