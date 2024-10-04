import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Cuisinier extends Creature {
    name = "Cuisinier";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);
        this.familles.base.push("Humain");
        
        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.familles.base.includes("Nourriture") && card.owner == this.owner) {
            for (const e of card.elements) {
                if (e != "Neutre") {
                    this.owner.ressource(e).current += 3;
                }
                else {
                    this.owner.ressource("Or").current += 3;
                }
            }
        }
    };
}