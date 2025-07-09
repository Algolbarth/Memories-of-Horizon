import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ElementaireDEau extends Creature {
    name = "Élémentaire d'eau";

    constructor(System) {
        super(System);

        this.init([["Eau", 15]]);
        this.familles.base.push("Élémentaire");

        this.stat("Vie").base = 15;
        this.stat("Vie").current = 15;
        this.stat("Attaque").base = 15;

        this.text = Text;
    };

    text = function () {
        return "";
    };

    addEffect = function (zone) {
        if (zone == "Terrain" && this.owner.ressource("Eau").total() >= 5) {
            this.owner.ressource("Eau").spend(5);
            this.stat("Attaque").add += 5;
            this.stat("Vie").add += 5;
            this.stat("Vie").current += 5;
        }
    };
}