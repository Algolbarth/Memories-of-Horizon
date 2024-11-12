import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Danseuse extends Creature {
    name = "Danseuse";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    startBattleEffect = function () {
        this.stat("Esquive").step += 1;
    };
}