import { copy } from '../../../../Utils/Class.js';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Lion extends Creature {
    name = "Lion";

    constructor(System) {
        super(System);

        this.init([["Or", 30], ["Feu", 30]]);
        this.familles.base.push("Bête");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;

        this.text = Text;
    };

    useEffect = function () {
        let terrain = copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature" && card.familles.total().includes("Bête")) {
                card.stat("Attaque").add += 5;
                card.stat("Vie").current += 5;
                card.stat("Vie").add += 5;
            }
        }
        this.move("Terrain");
        this.pose();
    };
}