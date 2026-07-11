import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class SalamandreDesEaux extends Creature {
    name = "Salamandre des eaux";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Eau", 10]]);

        this.initFamily(["Reptile"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Intoxication} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Intoxication").add("Inventaire");
        }
    };
};