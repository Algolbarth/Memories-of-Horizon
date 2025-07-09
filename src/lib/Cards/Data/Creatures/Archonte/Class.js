import { copy } from '../../../../Utils';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Archonte extends Creature {
    name = "Archonte";

    constructor(System) {
        super(System);

        this.init([["Or", 55], ["Terre", 55]]);
        this.familles.base.push("Nain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 5;
        this.stat("Défense").base = 3;

        this.text = Text;
    };

    useEffect = function () {
        let terrain = copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            card.stat("Défense").add += 10;
        }
        this.move("Terrain");
        this.pose();
    };
}