import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Wyverne extends Creature {
    name = "Wyverne";

    constructor(System) {
        super(System);

        this.level = 3;
        this.init([["Or", 50]]);
        this.familles.base.push("Reptile");

        this.stat("Vie").base = 25;
        this.stat("Vie").current = 25;
        this.stat("Attaque").base = 25;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Boutique" && card.owner == this.owner) {
            this.getCout("Or").add -= 5;
        }
    };
}