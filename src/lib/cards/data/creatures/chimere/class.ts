import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Chimere extends Creature {
    name = "Chimère";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Bête", "Reptile"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);

        this.addText(`Quand posé : Augmente de 10 sa constitution et sa force pour chaque famille différentes parmi les créatures sur votre terrain.`);
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

        this.stat("Constitution").increase(10 * family_list.length);
        this.stat("Force").increase(10 * family_list.length);

        this.move("Terrain");
        this.pose();
    };
};