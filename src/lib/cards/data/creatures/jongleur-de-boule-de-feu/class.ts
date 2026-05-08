import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class JongleurDeBouleDeFeu extends Creature {
    name = "Jongleur de boule de feu";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Feu", 25]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(10);
        this.stat("Magie").init(15);

        this.addText(`Quand une {card:Boule de feu} alliée est posée : Si sur le terrain : Génère {card:Boule de feu} sur votre pile.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && this.isAlly(card) && card.name == "Boule de feu") {
            this.owner().getCard("Boule de feu").add("Pile");
        }
    };
};