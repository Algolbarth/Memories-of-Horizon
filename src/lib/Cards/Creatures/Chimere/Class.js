import { copy } from '../../../Utils/Class.js';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Chimere extends Creature {
    name = "Chimère";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);
        this.familles.base.push("Bête", "Reptile");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;

        this.text = Text;
    };

    useEffect = function () {
        let list = [];
        let terrain = copy(this.owner.zone("Terrain").cards);

        for (const card of terrain) {
            if (card.type == "Créature") {
                for (const famille of card.familles.total()) {
                    if (!list.includes(famille)) {
                        list.push(famille);
                    }
                }
            }
        }

        console.log(list)

        this.stat("Attaque").add += 10 * list.length;
        this.stat("Vie").current += 10 * list.length;
        this.stat("Vie").add += 10 * list.length;

        this.move("Terrain");
        this.pose();
    };
}