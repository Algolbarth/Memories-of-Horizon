import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ElementaireDesHerbes extends Creature {
    name = "Élémentaire des herbes";

    constructor(System) {
        super(System);

        this.init([["Végétal", 15]]);
        this.familles.base.push("Élémentaire");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    dieEffect = function () {
        let target = undefined;

        for (const card of this.owner.zone("Terrain").cards) {
            if (target == undefined && card.type == "Créature") {
                target = card;
            }
        }

        if (target != undefined) {
            target.stat("Attaque").add += 5;
            target.stat("Vie").add += 5;
            target.stat("Vie").current += 5;
        }
    };
}