import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class CavalierElfe extends Creature {
    name = "Cavalier elfe";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Végétal", 15]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);
        this.stat("Vitesse").init(1);

        this.addText(`Quand posé : [resolve {20, augmente de 1 sa vitesse.}]`);
    };

    useEffect = () => {
        if (this.owner().totalIntelligence() >= 20) {
            this.stat("Vitesse").increase(1);
        }

        this.move("Défausse");
        this.pose();
    };
};