import { copy } from '../../../../Utils';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class SoldatNain extends Creature {
    name = "Soldat nain";

    constructor(System) {
        super(System);

        this.init([["Or", 18], ["Terre", 18]]);
        this.familles.base.push("Nain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;
        this.stat("Défense").base = 5;

        this.text = Text;
    };

    addEffect = function (zone) {
        if (zone == "Terrain") {
            let terrain = copy(this.owner.zone("Terrain").cards);
            for (const card of terrain) {
                if (card.type == "Bâtiment") {
                    this.stat("Attaque").add += 2;
                    this.stat("Vie").current += 2;
                    this.stat("Vie").add += 2;
                }
            }
        }
    };
}