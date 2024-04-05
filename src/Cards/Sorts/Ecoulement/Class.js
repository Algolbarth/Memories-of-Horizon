import { Sort } from '../Sort.js';
import Text from './Text.svelte';

export class Ecoulement extends Sort {
    name = "Écoulement";

    constructor(System) {
        super(System);

        this.init([["Or", 10], ["Eau", 10]]);

        this.text = Text;
    };

    useEffect = function () {
        if (this.owner.ressource("Mana").total() >= 15 && this.owner.ressource("Eau").total() >= this.manaCost(15)) {
            this.owner.ressource("Mana").spend(this.manaCost(15));
            this.owner.ressource("Eau").spend(15);
            this.owner.ressource("Eau").max += 10;
        }
        else {
            this.owner.ressource("Eau").max += 3;
        }

        this.move("Défausse");
        this.pose();
    };
}