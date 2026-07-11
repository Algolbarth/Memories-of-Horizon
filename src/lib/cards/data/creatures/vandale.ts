import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Building } from '$lib/cards/class/building';

export class Vandale extends Creature {
    name = "Vandale";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Terre", 50]]);

        this.initFamily(["Minotaure"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);

        this.addText(`Quand un bâtiment adverse meurt : Si sur le terrain : Stocke 5 or et 5 terre.`);
    };

    otherDieEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Building && this.isNotAlly(card)) {
            this.owner().ressource("Or").stock(5);
            this.owner().ressource("Terre").stock(5);
        }
    };
};