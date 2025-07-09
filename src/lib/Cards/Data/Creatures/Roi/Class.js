import { copy } from '../../../../Utils/Class.js';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Roi extends Creature {
    name = "Roi";

    constructor(System) {
        super(System);

        this.init([["Or", 110]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    useEffect = function () {
        let terrain = copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature") {
                card.stat("Attaque").add += 10;
                card.stat("Vie").current += 10;
                card.stat("Vie").add += 10;
            }
        }
        this.move("Terrain");
        this.pose();
    };
}