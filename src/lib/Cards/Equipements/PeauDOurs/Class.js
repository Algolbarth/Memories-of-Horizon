import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class PeauDOurs extends Equipment {
    name = "Peau d'ours";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);
        this.familles.base.push("Bête");

        this.text = Text;
    };

    otherDieEffect = function (card) {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain" && card.type == "Créature" && card.owner == this.bearer.owner && card.familles.total().includes("Bête")) {
            this.bearer.stat("Vie").add += 8;
            this.bearer.stat("Vie").add += 8;
        }
    };
}