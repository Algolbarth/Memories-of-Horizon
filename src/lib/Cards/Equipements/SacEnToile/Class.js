import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class SacEnToile extends Equipment {
    name = "Sac en toile";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            this.owner.draw(1);
        }
    };
}