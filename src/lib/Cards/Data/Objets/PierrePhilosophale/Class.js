import { Objet } from '../Objet.js';
import Text from './Text.svelte';

export class PierrePhilosophale extends Objet {
    name = "Pierre Philosophale";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner.flux > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        this.owner.ressource("Or").max += this.owner.flux;
        this.owner.ressource("Or").current += this.owner.flux;
        this.owner.flux = 0;
        this.move("Défausse");
        this.pose();
    };
}