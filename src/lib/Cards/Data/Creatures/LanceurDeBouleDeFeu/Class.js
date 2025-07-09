import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class LanceurDeBouleDeFeu extends Creature {
    name = "Lanceur de boule de feu";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Feu", 20]]);
        this.familles.base.push("Gobelin");

        this.stat("Vie").base = 3;
        this.stat("Vie").current = 3;
        this.stat("Attaque").base = 10;
        this.stat("Magie").base = 15;

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.getCard("Boule de feu").add("Boutique");
        }
    };
}