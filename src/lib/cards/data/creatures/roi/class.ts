import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Roi extends Creature {
    name = "Roi";

    constructor(system: System) {
        super(system);

        this.init([["Or", 110]]);

        this.initFamily(["Humain", "Commandant"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand posé : Augmente de 10 la constitution et la force de toutes les créatures sur votre terrain.`);
    };

    useEffect = () => {
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Constitution").increase(10);
                card.stat("Force").increase(10);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};