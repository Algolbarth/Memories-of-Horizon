import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';
import { Building } from '$lib/cards/class/building';
import type { Unit } from '$lib/cards/class/unit';

export class WyverneDesToits extends Creature {
    name = "Wyverne des toits";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 90], ["Terre", 90]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.addText(`Quand un bâtiment allié est posé : Si sur la pile : Réduit de 20 son coût.`);
        this.addText(`Quand attaque : Inflige 5 dégâts spéciaux à l'unité attaquée pour chaque bâtiment sur votre terrain.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card instanceof Building) {
            this.costReduce(20);
        }
    };

    fightEffect = (defender: Unit) => {
        let damage: number = 0;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Building) {
                damage += 5;
            }
        }

        defender.specialDamage(damage, this);
    };
};