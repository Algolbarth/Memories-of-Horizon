import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Barde extends Creature {
    name = "Barde";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Augmente de 5 la constitution et la force de toutes les créatures sur votre terrain pendant ce tour.`);
    };

    useEffect = () => {
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Force").turn += 5;
                card.stat("Vitalité").turn += 5;
                card.stat("Santé").turn += 5;
            }
        }

        this.move("Terrain");
        this.pose();
    };
};