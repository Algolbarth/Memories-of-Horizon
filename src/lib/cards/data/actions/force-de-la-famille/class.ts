import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';

export class ForceDeLaFamille extends Action {
    name = "Force de la famille";

    constructor(system: System) {
        super(system);

        this.init([["Or", 65]]);

        this.addText(`Quand posé : Si toutes les créatures sur votre terrain partagent au moins une famille en commun : Augmente de 1 la constitution et la force de toutes les créatures sur votre terrain pour chaque créature sur votre terrain.`);
    };

    canUse = () => {
        let family_list: string[] = [];
        let battlefield = copy(this.owner().zone("Terrain").cards);

        for (const card of battlefield) {
            if (card instanceof Creature) {
                for (const family of card.families.total()) {
                    if (!family_list.includes(family)) {
                        family_list.push(family);
                    }
                }
            }
        }

        for (const family of family_list) {
            let check: boolean = true;

            for (const card of battlefield) {
                if (card instanceof Creature) {
                    if (!card.families.total().includes(family)) {
                        check = false;
                    }
                }
            }

            if (check) {
                return true;
            }
        }

        return false;
    };

    useEffect = () => {
        let nb_creature = 0;
        let battlefield = copy(this.owner().zone("Terrain").cards);

        for (const card of battlefield) {
            if (card instanceof Creature) {
                nb_creature++;
            }
        }

        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Constitution").increase(nb_creature);
                card.stat("Force").increase(nb_creature);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};