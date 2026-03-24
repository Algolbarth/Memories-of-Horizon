import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Champion extends Creature {
    name = "Champion";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Endurance").init(5);

        this.addText(`Tant que placé en première position sur le terrain : Double sa force et son endurance.`);

        this.stat("Force").effect = function (total: number) {
            if (this.card.system.game != undefined && this.card.isArea("Terrain") && this.card.emplacement() == 0) {
                return total * 2;
            }
            return total;
        };

        this.stat("Endurance").effect = function (total: number) {
            if (this.card.system.game != undefined && this.card.isArea("Terrain") && this.card.emplacement() == 0) {
                return total * 2;
            }
            return total;
        };
    };
};