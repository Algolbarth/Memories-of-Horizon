import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Lion extends Creature {
    name = "Lion";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Feu", 30]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);

        this.addText(`Quand posé : Augmente de 5 la constitution et la force de toutes les créatures de famille Bête sur le terrain.`);
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.isFamily("Bête")) {
                card.stat("Constitution").increase(5);
                card.stat("Force").increase(5);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};