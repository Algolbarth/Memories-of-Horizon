import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Chasseur extends Creature {
    name = "Chasseur";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    otherDieEffect = function (card) {
        if (this.zone.name == "Terrain" && card.type == "Créature" && card.familles.base.includes("Bête")) {
            this.stat("Vie").current += 1;
            this.stat("Vie").add += 1;
            this.stat("Attaque").add += 1;
        }
    };
}