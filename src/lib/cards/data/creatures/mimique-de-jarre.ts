import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class MimiqueDeJarre extends Creature {
    name = "Mimique de jarre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand posé : Se place sur le terrain adverse.`);
        this.addText(`Quand meurt sur le terrain : Stocke 10 or chez l'adversaire.`);
    };

    useEffect = () => {
        this.move("Terrain", this.adversary());
        this.pose();
    };

    dieEffect = () => {
        if (this.isArea("Terrain")) {
            this.adversary().ressource("Or").stock(10);
        }
    };
};