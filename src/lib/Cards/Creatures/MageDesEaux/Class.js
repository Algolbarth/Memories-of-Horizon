import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class MageDesEaux extends Creature {
    name = "Mage des eaux";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Eau", 20]]);
        this.familles.base.push("Ondin");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
        this.stat("Magie").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (c) {
        if (this.zone.name == "Terrain" && c.familles.total().includes("Sort") && c.owner == this.owner) {
            let condition = function (card) {
                if (card.familles.total().includes("Sort")) {
                    return true;
                }
                return false;
            };

            let cards = this.owner.draw(1, condition);

            if (cards[0] != undefined && this.owner.ressource("Mana").total() >= 5) {
                this.owner.ressource("Mana").spend(5);
                cards[0].coutReduce(5);
            }
        }
    };
}