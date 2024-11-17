import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ChefDeClan extends Creature {
    name = "Chef de clan";

    constructor(System) {
        super(System);

        this.init([["Or", 55], ["Feu", 55]]);
        this.familles.base.push("Gobelin");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    useEffect = function () {
        let terrain = this.System.copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature") {
                card.stat("Attaque").add += 20;
            }
        }
        this.move("Terrain");
        this.pose();
    };
}