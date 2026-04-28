import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { copy } from '$lib/utils';

export class ChefDeBande extends Creature {
    name = "Chef de bande";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText(`Quand posé : [prime {50, Augmente de 5 la constitution et la force de toutes les créatures sur votre terrain.}]`);
    };

    useEffect = () => {
        if (this.owner().ressource("Or").total() >= 50) {
            this.owner().ressource("Or").spend(50);

            let battlefield = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    card.stat("Constitution").increase(5);
                    card.stat("Force").increase(5);
                }
            }
        }

        this.move("Terrain");
        this.pose();
    };
};