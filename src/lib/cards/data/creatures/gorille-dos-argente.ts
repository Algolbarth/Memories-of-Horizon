import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class GorilleDosArgente extends Creature {
    name = "Gorille dos argenté";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Nature", 50]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Écrasement} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Écrasement").add("Inventaire");
        }
    };
};