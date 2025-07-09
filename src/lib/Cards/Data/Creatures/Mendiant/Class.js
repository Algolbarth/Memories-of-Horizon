import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Mendiant extends Creature {
    name = "Mendiant";

    constructor(System) {
        super(System);

        this.init([["Or", 1]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.ressource("Or").spend(2);
        }
    };
}