import { copy } from '../../../Utils/Class.js';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class SeigneurOndin extends Creature {
    name = "Seigneur ondin";

    constructor(System) {
        super(System);

        this.init([["Or", 55], ["Eau", 55]]);
        this.familles.base.push("Ondin");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    useEffect = function () {
        let terrain = copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature") {
                this.owner.ressource("Eau").current += 5;
                card.stat("Attaque").add += 5;
                card.stat("Vie").current += 5;
                card.stat("Vie").add += 5;
            }
        }
        this.move("Terrain");
        this.pose();
    };
}