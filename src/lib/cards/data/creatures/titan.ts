import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Titan extends Creature {
    name = "Titan";

    constructor(system: System) {
        super(system);

        this.init([["Or", 250]]);

        this.initFamily(["Géant", "Commandant"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText(`Quand posé : Augmente de 25 la constitution et la force de toutes les créatures de niveau 5 ou plus sur votre terrain.`);
    };

    useEffect = () => {
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.level >= 5) {
                card.stat("Constitution").increase(25);
                card.stat("Force").increase(25);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};