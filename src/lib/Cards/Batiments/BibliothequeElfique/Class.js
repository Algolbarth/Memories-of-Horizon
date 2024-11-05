import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class BibliothequeElfique extends Batiment {
    name = "Bibliothèque elfique";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Végétal", 25]]);
        this.familles.base.push("Elfe");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.type == "Créature" && card.familles.total().includes("Elfe")) {
            this.stat("Intelligence").add += 1;
        }
    }
}