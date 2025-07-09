import { copy } from '../../../../Utils';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Doyen extends Creature {
    name = "Doyen";

    constructor(System) {
        super(System);

        this.init([["Or", 55], ["Végétal", 55]]);
        this.familles.base.push("Elfe");

        this.stat("Vie").base = 15;
        this.stat("Vie").current = 15;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    useEffect = function () {
        let terrain = copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature") {
                card.stat("Vie").current += 15;
                card.stat("Vie").add += 15;
            }
        }
        this.move("Terrain");
        this.pose();
    };
}