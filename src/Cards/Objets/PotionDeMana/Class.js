import { Objet } from '../Objet.js';
import Text from './Text.svelte';

export class PotionDeMana extends Objet {
    name = "Potion de mana";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);

        this.text = Text;
    };

    useEffect = function (target) {
        this.owner.ressource("Mana").current += 5;
        this.move("Défausse");
        this.pose();
    };
}