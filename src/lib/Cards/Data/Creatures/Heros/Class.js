import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Heros extends Creature {
    name = "Héros";

    constructor(System) {
        super(System);

        this.init([["Or", 110]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.type == "Créature" && card.owner == this.owner) {
            this.stat("Vie").current += 10;
            this.stat("Vie").add += 10;
            this.stat("Attaque").add += 10;
        }
    };
}