import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneCracheuseDeBouleDeFeu extends Creature {
    name = "Wyverne cracheuse de boule de feu";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 75], ["Feu", 75]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.addText(`Quand une {card:Boule de feu} alliée est posée : Si sur la pile : Réduit de 10 son coût.`);
        this.addText(`Quand une {card:Boule de feu} alliée est posée : Si sur le terrain : Augmente de 30 sa force pendant ce tour.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.name == "Boule de feu") {
            if (this.isArea("Pile")) {
                this.costReduce(10);
            }
            else if (this.isArea("Terrain")) {
                this.stat("Force").turn += 30;
            }
        }
    };
};