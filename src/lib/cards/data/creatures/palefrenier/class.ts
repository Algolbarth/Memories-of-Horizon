import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';
import Text from './text.svelte';

export class Palefrenier extends Creature {
    name = "Palefrenier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.text = Text;
    };

    useEffect = () => {
        if (this.owner().zone("Pile").isNotFull()) {
            let card: Card = this.owner().getCard("Monture de chevalier");
            card.costReduce(40);
            card.add("Pile");
        }

        this.move("Terrain");
        this.pose();
    };
};