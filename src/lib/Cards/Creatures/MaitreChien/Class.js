import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class MaitreChien extends Creature {
    name = "Maître chien";

    constructor(System) {
        super(System);

        this.init([["Or", 15]]);
        this.familles.base.push("Humain");
        
        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    useEffect = function () {
        this.owner.getCard("Chien").add("Terrain");
        this.owner.getCard("Chien").add("Terrain");
        this.move("Terrain");
        this.pose();
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.getCard("Chien").add("Terrain");
        }
    };
}