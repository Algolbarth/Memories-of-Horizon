import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class OndinDesRivieres extends Creature {
    name = "Ondin des rivières";

    constructor(System) {
        super(System);

        this.init([["Or", 12], ["Eau", 12]]);
        this.familles.base.push("Ondin");
        
        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };
    
    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.ressource("Eau").current += 10;
        }
    };
}