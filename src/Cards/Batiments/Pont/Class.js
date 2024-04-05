import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class Pont extends Batiment {
    name = "Pont";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.type == "Créature" && this.owner == card.owner) {
            this.owner.draw(1);
        }
    };
}