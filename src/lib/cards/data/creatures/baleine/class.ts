import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Text from './text.svelte';

export class Baleine extends Creature {
    name = "Baleine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Eau", 50]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(75);
        this.stat("Force").init(50);

        this.text = Text;
    };

    useEffect = () => {
        this.stat("Constitution").increase(this.owner().ressource("Eau").production);

        this.move("Terrain");
        this.pose();
    };
};