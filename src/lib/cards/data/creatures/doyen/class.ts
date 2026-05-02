import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Doyen extends Creature {
    name = "Doyen";

    constructor(system: System) {
        super(system);

        this.init([["Or", 55], ["Nature", 55]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Augmente de 15 la constitution de toutes les créatures sur votre terrain.`);
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Constitution").increase(15);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};