import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ElementaireDeFeu extends Creature {
    name = "Élémentaire de feu";

    constructor(System) {
        super(System);

        this.init([["Feu", 15]]);
        this.familles.base.push("Élémentaire");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;
        this.text = Text;
    };

    addEffect = function (zone) {
        if (zone == "Terrain" && this.owner.ressource("Feu").max >= 1) {
            this.owner.ressource("Feu").max--;
        }
    };
}