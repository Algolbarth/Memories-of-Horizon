import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Chasseur extends Creature {
    name = "Chasseur";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    otherDieEffect = function (card) {
        if (this.zone.name == "Terrain" && card.type == "Créature" && card.owner == this.owner && card.familles.total().includes("Bête")) {
            this.stat("Vie").current += 2;
            this.stat("Vie").add += 2;
            this.stat("Attaque").add += 5;
        }
    };
}