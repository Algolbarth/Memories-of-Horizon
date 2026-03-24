import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class BuletteBriseRoc extends Creature {
    name = "Bulette brise-roc";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Terre", 50]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(30);
        this.stat("Force").init(15);
        this.stat("Endurance").init(25);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Contre} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Contre").add("Inventaire");
        }
    };
};