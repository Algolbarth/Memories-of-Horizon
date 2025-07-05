import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class MageDeLaTerre extends Creature {
    name = "Mage de la terre";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Terre", 20]]);
        this.familles.base.push("Nain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
        this.stat("Défense").base = 3;
        this.stat("Magie").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.familles.total().includes("Sort") && card.owner == this.owner) {
            this.owner.getCard("Élémentaire de caillou").add("Main");
        }
    };
}