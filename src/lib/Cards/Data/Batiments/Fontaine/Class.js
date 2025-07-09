import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class Puit extends Batiment {
    name = "Puit";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Eau", 25]]);
        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.elements.total().includes("Eau") && this.owner == card.owner) {
            this.owner.ressource("Or").current += 5;
        }
    };
}