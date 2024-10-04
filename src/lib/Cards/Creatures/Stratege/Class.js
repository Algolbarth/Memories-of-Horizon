import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Stratège extends Creature {
    name = "Stratège";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.familles.base.push("Humain");
        
        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
        this.stat("Intelligence").base = 2;

        this.text = Text;
    };

    useEffect = function () {
        let condition = function (card) {
            if (card.type == "Action") {
                return true;
            }
            return false;
        };
        this.owner.draw(2, condition);
        this.move("Terrain");
        this.pose();
    };
}