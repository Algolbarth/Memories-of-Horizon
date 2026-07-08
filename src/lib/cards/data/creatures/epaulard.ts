import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Epaulard extends Creature {
    name = "Épaulard";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Eau", 50]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(75);
        this.stat("Force").init(75);

        this.addText(`Quand posé : Augmente d'autant sa force que votre production d'eau.`);
    };

    useEffect = () => {
        this.stat("Force").increase(this.owner().ressource("Eau").production);

        this.move("Terrain");
        this.pose();
    };
};