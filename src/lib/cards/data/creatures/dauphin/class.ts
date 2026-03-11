import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Text from './text.svelte';
import type { Card } from '$lib/cards/class/class';

export class Dauphin extends Creature {
    name = "Dauphin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Eau", 25]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.text = Text;
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);

        if (cards[0] != undefined) {
            cards[0].costReduce(this.owner().ressource("Eau").production);
        }

        this.move("Terrain");
        this.pose();
    };
};