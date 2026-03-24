import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class AncienSerpent extends Creature {
    name = "Ancien serpent";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Végétal", 15]]);

        this.initFamily(["Reptile"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Mue} sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Mue").add("Inventaire");
        }
    };
};