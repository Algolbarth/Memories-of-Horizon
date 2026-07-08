import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class SageDement extends Creature {
    name = "Sage dément";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35], ["Feu", 35]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(10);

        this.addText(`Tant que votre pile est vide : Augmente de 25 son intelligence.`);

        this.stat("Intelligence").effect = function (total: number) {
            if (this.card.system.game != undefined && this.card.owner().zone("Pile").cards.length == 0) {
                return total + 25;
            }
            return total;
        };
    };
};