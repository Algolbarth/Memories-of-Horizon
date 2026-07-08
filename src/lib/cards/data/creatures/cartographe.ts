import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Cartographe extends Creature {
    name = "Cartographe";

    constructor(system: System) {
        super(system);

        this.init([["Or", 105]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Carte de la région} sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Carte de la région").add("Inventaire");
        }
    };
};