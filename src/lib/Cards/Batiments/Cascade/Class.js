import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class Cascade extends Batiment {
    name = "Cascade";

    constructor(System) {
        super(System);

        this.init([["Or", 12], ["Eau", 12]]);
        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.elements.total().includes("Eau") && this.owner == card.owner) {
            this.owner.ressource("Eau").current += 2;
        }
    };
}