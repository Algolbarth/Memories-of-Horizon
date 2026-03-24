import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import { Creature } from '$lib/cards/class/creature';

export class Banniere extends Item {
    name = "Bannière";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.addText(`Quand posé : Augmente de 3 la constitution et la force de toutes les créatures sur votre terrain.`);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Constitution").increase(3);
                card.stat("Force").increase(3);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};