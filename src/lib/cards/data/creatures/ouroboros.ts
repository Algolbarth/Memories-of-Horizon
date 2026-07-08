import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Ouroboros extends Creature {
    name = "Ouroboros";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Reptile"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Pierre philosophale} dans votre inventaire.`);
        this.addText(`Quand une {card:Pierre philosophale} alliée est posée : Si sur le terrain : Augmente d'autant sa constitution et sa force que le flux dépensé.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Pierre philosophale").add("Inventaire");
        }
    };
};