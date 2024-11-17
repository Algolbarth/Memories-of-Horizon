import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class Pelle extends Equipment {
    name = "Pelle";

    constructor(System) {
        super(System);

        this.init([["Or", 18], ["Terre", 18]]);

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            let condition = function (card) {
                if (card.elements.total().includes("Terre")) {
                    return true;
                }
                return false;
            }
            let cards = this.owner.discover(1, condition);
            this.owner.ressource("Terre").current += cards[0].level;
        }
    };
}