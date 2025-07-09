import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Champion extends Creature {
    name = "Champion";

    constructor(System) {
        super(System);

        this.init([["Or", 100]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;
        this.stat("Défense").base = 5;

        this.text = Text;

        this.stat("Attaque").value = function () {
            let total = this.base + this.add + this.step;
            if (this.card.type == "Créature") {
                for (const equipment of this.card.equipments) {
                    total += equipment.equipStat(this.name).value();
                }
            }

            if (this.card.System.game != undefined && this.card.zone.name == "Terrain" && this.card.slot == 0) {
                total += total;
            }

            if (total > 0) {
                return total;
            }
            else {
                return 0;
            }
        };

        this.stat("Défense").value = function () {
            let total = this.base + this.add + this.step;
            if (this.card.type == "Créature") {
                for (const equipment of this.card.equipments) {
                    total += equipment.equipStat(this.name).value();
                }
            }

            if (this.card.System.game != undefined && this.card.zone.name == "Terrain" && this.card.slot == 0) {
                total += total;
            }

            if (total > 0) {
                return total;
            }
            else {
                return 0;
            }
        };
    };
}