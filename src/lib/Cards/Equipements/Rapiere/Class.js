import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class Rapiere extends Equipment {
    name = "Rapière";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);

        this.text = Text;
    };

    startBattleEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            this.bearer.stat("Critique").current = 100;
        }
    };
}