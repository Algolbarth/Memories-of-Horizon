import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Forgeron extends Creature {
    name = "Forgeron";

    constructor(System) {
        super(System);

        this.init([["Or", 15]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    useEffect = function () {
        let condition = function (card) {
            if (card.familles.total().includes("Équipement")) {
                return true;
            }
            return false;
        };
        this.owner.draw(3, condition);
        this.move("Terrain");
        this.pose();
    };
}