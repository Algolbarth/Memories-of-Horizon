import { copy } from '../../../Utils/Class.js';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class General extends Creature {
    name = "Général";

    constructor(System) {
        super(System);

        this.init([["Or", 110]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    startStepEffect = function () {
        let terrain = copy(this.owner.zone("Terrain").cards);
        if (this.zone.name == "Terrain") {
            for (const card of terrain) {
                if (card.type == "Créature") {
                    card.stat("Attaque").add += 5;
                    card.stat("Vie").current += 5;
                    card.stat("Vie").add += 5;
                }
            }
        }
    };
}