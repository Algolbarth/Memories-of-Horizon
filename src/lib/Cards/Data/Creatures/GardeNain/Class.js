import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class GardeNain extends Creature {
    name = "Garde nain";

    constructor(System) {
        super(System);

        this.init([["Or", 18], ["Terre", 18]]);
        this.familles.base.push("Nain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;
        this.stat("Défense").base = 5;
        this.stat("Protection").base = 1;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.type == "Bâtiment" && card.owner == this.owner) {
            this.stat("Défense").add += 1;
        }
    };
}