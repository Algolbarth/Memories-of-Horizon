import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Emeutier extends Creature {
    name = "Émeutier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Terre", 20]]);

        this.initFamily(["Nain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(15);
        this.stat("Endurance").init(5);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Brique} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        this.owner().getCard("Brique").add("Inventaire");
    };
};