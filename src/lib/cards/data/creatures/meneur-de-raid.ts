import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Building } from '$lib/cards/class/building';

export class MeneurDeRaid extends Creature {
    name = "Meneur de raid";

    constructor(system: System) {
        super(system);

        this.init([["Or", 75], ["Terre", 75]]);

        this.initFamily(["Minotaure", "Commandant"]);

        this.stat("Constitution").init(30);
        this.stat("Force").init(30);

        this.addText([`Quand un bâtiment adverse meurt : Si sur le terrain : Stocke 5 or et 5 terre`]);
    };

    otherDieEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Building && this.isNotAlly(card)) {
            this.owner().ressource("Or").stock(5);
            this.owner().ressource("Terre").stock(5);
        }
    };
};