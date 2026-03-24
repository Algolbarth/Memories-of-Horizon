import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class OfficierDArtillerie extends Creature {
    name = "Officier d'artillerie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 110]]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Tir de canon} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Tir de canon").add("Inventaire");
        }
    };
};