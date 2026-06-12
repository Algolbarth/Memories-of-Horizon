import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Spell } from '$lib/cards/class/spell';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';

export class Peupler extends Spell {
    name = "Peupler";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.addText(`Pioche 1 créature pour chaque créature sur votre terrain.`);
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
        let nb_creature = 0;
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                nb_creature++;
            }
        }

        let readCondition = (card: Card) => {
            if (card instanceof Creature) {
                return true;
            }
            return false;
        };
        this.owner().draw(nb_creature, readCondition);

        this.move("Défausse");
        this.pose();
    };
};