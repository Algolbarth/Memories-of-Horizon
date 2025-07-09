import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class Cascade extends Batiment {
    name = "Cascade";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Eau", 15]]);
        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.elements.total().includes("Eau") && this.owner == card.owner) {
            let condition = function (card) {
                if (card.elements.total().includes("Eau")) {
                    return true;
                }
                return false;
            };
            this.owner.draw(1, condition);
        }
    };
}