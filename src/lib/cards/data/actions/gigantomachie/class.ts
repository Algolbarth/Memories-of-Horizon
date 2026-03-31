import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class Gigantomachie extends Action {
    name = "Gigantomachie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 160]]);

        this.initFamily(["Géant"]);

        this.addText(`Quand posé : Inflige 5 dégâts spéciaux à toutes les unités de niveau 5 ou moins sur le terrain pour chaque unités de niveau 5 ou plus sur le terrain.`);
    };

    canUse = () => {
        let check_inferior_level_5 = false;
        let check_superior_level_5 = false;

        let battlefield = copy(this.owner().zone("Terrain").cards);
        let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);

        for (const zone of [battlefield, adversary_battlefield]) {
            for (const card of zone) {
                if (card.level >= 5) {
                    check_superior_level_5 = true;
                }
                else {
                    check_inferior_level_5 = true;
                }

                if (check_inferior_level_5 && check_superior_level_5) {
                    return true;
                }
            }
        }

        return false;
    };

    useEffect = () => {
        let nb_level_5 = 0;

        let battlefield = copy(this.owner().zone("Terrain").cards);
        let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);

        for (const zone of [battlefield, adversary_battlefield]) {
            for (const card of zone) {
                if (card.level >= 5) {
                    nb_level_5++;
                }
            }
        }

        for (const zone of [battlefield, adversary_battlefield]) {
            for (const card of zone) {
                if (card.level < 5) {
                    card.specialDamage(5 * nb_level_5, this);
                }
            }
        }

        this.move("Défausse");
        this.pose();
    };
};