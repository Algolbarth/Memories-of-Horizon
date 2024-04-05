import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ElementaireDesRacines extends Creature {
    name = "Élémentaire des racines";

    constructor(System) {
        super(System);

        this.init([["Végétal", 50]]);
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
            target.stat("Attaque").add += this.stat("Attaque").value();
            target.stat("Vie").add += this.stat("Vie").value();
            target.stat("Vie").current += this.stat("Vie").value();
        }
    };
}