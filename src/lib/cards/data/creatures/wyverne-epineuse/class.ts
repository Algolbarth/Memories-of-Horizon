import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneEpineuse extends Creature {
    name = "Wyverne épineuse";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 90], ["Nature", 90]]);

        this.initFamily(["Reptile", "Wyverne", "Plante"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);
        this.stat("Épine").init(20);

        this.addText(`Quand une unité alliée avec une épine supérieure à 0 est attaquée : Si sur la pile : Réduit de 5 son coût.`);
    };

    otherDefendEffect = (defender: Card, attacker: Card) => {
        if (this.isArea("Pile") && this.isAlly(defender) && defender.stat("Épine").value() > 0) {
            this.costReduce(5);
        }
    };
};