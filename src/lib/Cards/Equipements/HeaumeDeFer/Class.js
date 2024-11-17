import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class HeaumeDeFer extends Equipment {
    name = "Heaume de fer";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            this.bearer.stat("Garde").fix(25);
        }
    };
}