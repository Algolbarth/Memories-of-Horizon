import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Dresseur extends Creature {
    name = "Dresseur";

    constructor(System) {
        super(System);

        this.init([["Or", 10], ["Végétal", 10]]);
        this.familles.base.push("Elfe");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    useEffect = function () {
        let condition = function (card) {
            if (card.type == "Créature" && card.familles.total().includes("Bête")) {
                return true;
            }
            return false;
        };
        let cards = this.owner.draw(1, condition);

        if (cards[0] != undefined) {
            cards[0].stat("Vie").add += 10;
            cards[0].stat("Vie").current += 10;
            cards[0].stat("Attaque").add += 10;
        }

        this.move("Terrain");
        this.pose();
    };
}