import { Objet } from '../Objet.js';
import Text from './Text.svelte';

export class Tresor extends Objet {
    name = "Trésor";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);

        this.text = Text;
    };

    useEffect = function () {
        this.owner.draw(5);
        this.owner.ressource("Or").current += 10;
        this.move("Défausse");
        this.pose();
    };
}