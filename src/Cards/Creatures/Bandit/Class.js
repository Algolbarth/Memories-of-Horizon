import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Bandit extends Creature {
    name = "Bandit";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    useEffect = function () {
        if (this.owner.ressource("Or").total() >= 5) {
            this.owner.ressource("Or").spend(5);
            this.stat("Attaque").add += 5;
            this.stat("Vie").add += 5;
            this.stat("Vie").current += 5;
        }
        this.move("Terrain");
        this.pose();
    };
}