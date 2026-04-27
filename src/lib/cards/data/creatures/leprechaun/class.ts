import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Leprechaun extends Creature {
    name = "Leprechaun";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Végétal", 25]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(30);
        this.stat("Force").init(3);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Trèfle} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Trèfle").add("Inventaire");
        }
    };
};