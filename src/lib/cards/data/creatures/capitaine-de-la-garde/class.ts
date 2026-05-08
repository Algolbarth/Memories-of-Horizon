import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class CapitaineDeLaGarde extends Creature {
    name = "Capitaine de la garde";

    constructor(system: System) {
        super(system);

        this.init([["Or", 85]]);

        this.initFamily(["Humain", "Commandant"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);
        this.stat("Charisme").init(1);

        this.addText(`Quand posé : Augmente de 1 le charisme de toutes les créatures de charisme 1 ou plus sur le terrain.`);
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.stat("Charisme").value() > 0) {
                card.stat("Charisme").increase(1);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};