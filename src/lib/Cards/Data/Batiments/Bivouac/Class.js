import { copy } from '../../../../Utils/Class.js';
import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class Bivouac extends Batiment {
    name = "Bivouac";

    constructor(System) {
        super(System);

        this.init([["Or", 110]]);
        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            let terrain = copy(this.zone.cards);
            for (const card of terrain) {
                if (card.type == "Créature") {
                    card.heal(10);
                }
            }
        }
    };
}