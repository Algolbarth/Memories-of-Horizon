import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class CapeDAgilite extends Equipment {
    name = "Cape d'agilité";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.familles.base.push("Armure");

        this.text = Text;
    };

    turnEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            this.bearer.stat("Esquive").turn += 1;
        }
    };
}