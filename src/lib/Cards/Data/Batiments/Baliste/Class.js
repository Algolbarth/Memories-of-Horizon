import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class Baliste extends Batiment {
    name = "Baliste";

    constructor(System) {
        super(System);

        this.init([["Or", 40]]);
        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;

        this.text = Text;
    };

    turnEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.adversary().zone("Terrain").cards[0].damage(20);
        }
    };
}