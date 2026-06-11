import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';

export class MimiqueDeCoffre extends Creature {
    name = "Mimique de coffre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Se place sur le terrain adverse.`);
        this.addText(`Quand meurt sur le terrain : L'adversaire pioche 5 cartes et les verrouille.`);
    };

    useEffect = () => {
        this.move("Terrain", this.adversary());
        this.pose();
    };

    dieEffect = () => {
        if (this.isArea("Terrain")) {
            let cards: Card[] = this.adversary().draw(5);
            for (const c of cards) {
                c.lock();
            }
        }
    };
};