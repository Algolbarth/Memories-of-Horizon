import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Ruee extends Action {
    name = "Ruée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Augmente de 1 la vitesse de toutes les créatures sur votre terrain pendant ce tour.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        return false;
    };

    useEffect = () => {
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Vitesse").turn += 1;
            }
        }

        this.move("Défausse");
        this.pose();
    };
};