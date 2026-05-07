import type { Card } from '$lib/cards/class/class';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class CoupeBourse extends Creature {
    name = "Coupe-bourse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 80]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Vol à la tire} dans votre inventaire.`);
        this.addText(`Quand un {card:Vol à la tire} allié est posé : Si sur le terrain : Augmente de 10 sa vente en or.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Vol à la tire").add("Inventaire");
        }
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.name == "Vol à la tire") {
            this.getSale("Or").increase(10);
        }
    };
};