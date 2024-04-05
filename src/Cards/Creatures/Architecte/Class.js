import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Architecte extends Creature {
    name = "Architecte";

    constructor(System) {
        super(System);

        this.init([["Or", 12], ["Terre", 12]]);
        this.familles.base.push("Nain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
        this.stat("Défense").base = 3;

        this.text = Text;
    };

    useEffect = function () {
        let condition = function (card) {
            if (card.type == "Bâtiment") {
                return true;
            }
            return false;
        };
        let cards = this.owner.draw(1, condition);

        if (cards[0] != undefined) {
            cards[0].coutReduce(10);
        }

        this.move("Terrain");
        this.pose();
    };
}