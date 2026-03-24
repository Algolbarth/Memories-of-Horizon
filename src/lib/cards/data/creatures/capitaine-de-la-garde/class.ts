import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class CapitaineDeLaGarde extends Creature {
    name = "Capitaine de la garde";

    constructor(system: System) {
        super(system);

        this.init([["Or", 70]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Protection").init(1);

        this.addText(`Quand posé : Augmente de 1 la protection de toutes les créatures sur le terrain ayant une protection non nulle.`);
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.stat("Protection").value() > 0) {
                card.stat("Protection").increase(1);
            }
        }
        this.move("Terrain");
        this.pose();
    };
};