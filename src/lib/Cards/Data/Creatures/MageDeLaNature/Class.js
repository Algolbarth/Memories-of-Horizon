import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class MageDeLaNature extends Creature {
    name = "Mage de la nature";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Végétal", 20]]);
        this.familles.base.push("Elfe");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 5;
        this.stat("Magie").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (c) {
        if (this.zone.name == "Terrain" && c.familles.total().includes("Sort") && c.owner == this.owner) {
            let condition = function (card) {
                if (card.type == "Créature" && c.level == card.level) {
                    return true;
                }
                return false;
            };
            this.owner.draw(1, condition);
        }
    };
}