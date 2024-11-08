import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class Grimoire extends Equipment {
    name = "Grimoire";

    constructor(System) {
        super(System);

        this.init([["Or", 6]]);

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            let condition = function (card) {
                if (card.familles.total().includes("Sort")) {
                    return true;
                }
                return false;
            };
            this.owner.draw(1, condition);
        }
    };
}