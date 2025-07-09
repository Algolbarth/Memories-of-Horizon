import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class BonhommeBiscuit extends Creature {
    name = "Bonhomme biscuit";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);
        this.familles.base.push("Nourriture");

        this.stat("Vie").base = 1;
        this.stat("Vie").current = 1;
        this.stat("Attaque").base = 1;

        this.text = Text;
    };

    targetEffect = function (card) {
        if (this.zone.name == "Terrain" && card.familles.total().includes("Nourriture")) {
            this.stat("Vie").add += 3;
            this.stat("Vie").current += 3;
            this.stat("Attaque").add += 3;
        }
    };
}