import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Marchand extends Creature {
    name = "Marchand";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    useEffect = function () {
        this.owner.ressource("Or").max++;
        this.move("Terrain");
        this.pose();
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.ressource("Or").max++;
        }
    };
}