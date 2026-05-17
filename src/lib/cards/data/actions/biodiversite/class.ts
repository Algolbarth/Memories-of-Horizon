import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Biodiversite extends Action {
    name = "Biodiversité";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35], ["Nature", 35]]);

        this.addText(`Quand posé : Augmente de 5 la constitution et la force de toutes les créatures sur votre terrain pour chaque famille différentes parmi elles.`);
    };

    canUse = () => {
        if (this.owner().is_player || this.owner().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let family_list: string[] = [];
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);

        for (const card of battlefield) {
            if (card instanceof Creature) {
                for (const family of card.families.total()) {
                    if (!family_list.includes(family)) {
                        family_list.push(family);
                    }
                }
            }
        }

        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Constitution").increase(family_list.length * 5);
                card.stat("Force").increase(family_list.length * 5);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};