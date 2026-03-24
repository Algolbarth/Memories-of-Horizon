import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';

export class CoupDeBoule extends Action {
    name = "Coup de boule";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.addText(`Quand posé : Inflige à l'unité avec la plus haute vitalité sur le terrain adverse autant de dégâts que la force la plus haute parmi les créatures sur votre terrain.`);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length == 0) {
            return false;
        }
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        return false;
    };

    useEffect = () => {
        let value = 0;
        let target = this.adversary().zone("Terrain").cards[0];

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && value < card.stat("Force").value()) {
                value = card.stat("Force").value();
            }
        }

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target.stat("Vitalité").value() < card.stat("Vitalité").value()) {
                target = card;
            }
        }

        target.damageByEffect(value);

        this.move("Défausse");
        this.pose();
    };
};