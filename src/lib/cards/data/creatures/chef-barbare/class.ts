import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ChefBarbare extends Creature {
    name = "Chef barbare";

    constructor(system: System) {
        super(system);

        this.init([["Or", 150]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText(`Quand attaque : Augmente de 5 la force de toutes les créatures sur votre terrain.`);
    };

    fightEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Force").increase(5);
            }
        }
    };
};