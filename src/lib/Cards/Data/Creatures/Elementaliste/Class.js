import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Elementaliste extends Creature {
    name = "Élémentaliste";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    useEffect = function () {
        let condition = function (card) {
            if (card.familles.total().includes("Élémentaire")) {
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