import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class MinistreOndin extends Creature {
    name = "Ministre ondin";

    constructor(System) {
        super(System);

        this.init([["Or", 22], ["Eau", 22]]);
        this.familles.base.push("Ondin");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.type == "Créature" && card.familles.total().includes("Ondin") && card.owner == this.owner) {
            this.owner.ressource("Eau").current += 5;
        }
    };
}