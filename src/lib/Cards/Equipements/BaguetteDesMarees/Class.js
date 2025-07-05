import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class BaguetteDesMarees extends Equipment {
    name = "Baguette des marées";

    constructor(System) {
        super(System);

        this.init([["Or", 40], ["Eau", 40]]);
        this.familles.base.push("Arme");

        this.equipStat("Magie").base = 10;

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            this.owner.ressource("Eau").current += this.bearer.stat("Magie").value();
        }
    };
}