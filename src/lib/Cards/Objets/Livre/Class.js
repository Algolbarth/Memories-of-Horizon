import { Objet } from '../Objet.js';
import Text from './Text.svelte';

export class Livre extends Objet {
    name = "Livre";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);

        this.text = Text;
    };

    useEffect = function () {
        if (this.owner.totalIntelligence() >= 10) {
            this.owner.discover(2);
        }
        else {
            this.owner.discover(1);
        }
        this.move("Défausse");
        this.pose();
    };
}