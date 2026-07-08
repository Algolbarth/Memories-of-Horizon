import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class PorteFlambeau extends Creature {
    name = "Porte-flambeau";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Feu", 15]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(10);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Torche} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        this.owner().getCard("Torche").add("Inventaire");
    };
};