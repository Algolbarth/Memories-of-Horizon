import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Archonte extends Creature {
    name = "Archonte";

    constructor(system: System) {
        super(system);

        this.init([["Or", 55], ["Terre", 55]]);

        this.initFamily(["Nain", "Commandant"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(5);
        this.stat("Endurance").init(3);

        this.addText(`Quand posé : Augmente de 10 l'endurance de toutes les unités sur votre terrain.`);
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            card.stat("Endurance").increase(10);
        }

        this.move("Terrain");
        this.pose();
    };
};