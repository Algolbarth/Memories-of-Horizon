import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class Charrette extends Batiment {
    name = "Charrette";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.draw(5);
        }
    };
}