import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class TourDeSiege extends Batiment {
    name = "Tour de siège";

    constructor(System) {
        super(System);

        this.init([["Or", 40]]);
        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;

        this.text = Text;
    };

    turnEffect = function () {
        if (this.zone.name == "Terrain") {
            let target = undefined;
            let terrain = this.System.copy(this.zone.cards);

            for (const card of terrain) {
                if (target == undefined && card.type == "Créature") {
                    target = card;
                }
            }

            if (target != undefined) {
                target.stat("Attaque").add += 10;
                target.stat("Vie").add += 10;
                target.stat("Vie").current += 10;
            }
        }
    };
}