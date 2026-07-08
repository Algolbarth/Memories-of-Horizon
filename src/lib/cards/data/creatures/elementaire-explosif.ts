import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class ElementaireExplosif extends Creature {
    name = "Élémentaire explosif";

    constructor(system: System) {
        super(system);

        this.init([["Feu", 50]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText(`Quand posé : [blaze {5, Inflige 10 dégâts spéciaux à toutes les unités sur le terrain adverse.}]`);
    };

    useEffect = () => {
        if (this.owner().ressource("Feu").production >= 5) {
            this.owner().ressource("Feu").decrease(5);

            let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
            for (const card of adversary_battlefield) {
                card.specialDamage(10, this);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};