import {Objet} from '../Objet.js';
import Text from './Text.svelte';

export class Conque extends Objet {
    name = "Conque";

    constructor (System) {
        super(System);

        this.init([["Or", 10], ["Eau", 10]]);

        this.text = Text;
    };
    
    useEffect = function () {
        if (this.owner.ressource("Or").max > 5) {
            this.owner.ressource("Or").max -= 5;
            this.owner.ressource("Eau").max += 5;
        }
        this.move("Défausse");
        this.pose();
    };
}