import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Maire extends Creature {
    name = "Maire";

    constructor(System) {
        super(System);

        this.init([["Or", 55]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    startStepEffect = function () {
        this.owner.ressource("Or").current += 5 * this.owner.zone("Terrain").cards.length;
    };
}