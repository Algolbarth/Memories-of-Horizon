import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';

export class MilieuAquatique extends Action {
    name = "Milieu aquatique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Eau", 25]]);

        this.addText([
            `Quand posé : Augmente de 5 la constitution et la force de toutes les créatures d'élément Eau sur votre terrain.`,
            `[source {50, Augmente de 10 à la place.}]`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isElement("Eau")) {
                return true;
            }
        }
        return false;
    };

    useEffect = () => {
        let value = 5;
        if (this.owner().ressource("Eau").total() >= 50) {
            this.owner().ressource("Eau").spend(50);
            value = 10;
        }

        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.isElement("Eau")) {
                card.stat("Constitution").increase(value);
                card.stat("Force").increase(value);
            }
        }

        this.move("Défausse");
        this.pose();
    };
}