import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class LanceurDeBouleDeFeu extends Creature {
    name = "Lanceur de boule de feu";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Feu", 20]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(10);
        this.stat("Magie").init(15);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Boule de feu} sur votre pile.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Boule de feu").add("Pile");
        }
    };
};