import { copy } from '../../../../Utils';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Barde extends Creature {
    name = "Barde";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    useEffect = function () {
        let terrain = copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature") {
                card.stat("Attaque").step += 5;
                card.stat("Vie").current += 5;
                card.stat("Vie").step += 5;
            }
        }
        this.move("Terrain");
        this.pose();
    };
}