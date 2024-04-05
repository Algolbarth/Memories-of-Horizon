import {Objet} from '../Objet.js';
import Text from './Text.svelte';

export class Trefle extends Objet {
    name = "Trèfle";

    constructor (System) {
        super(System);

        this.init([["Or", 10], ["Végétal", 10]]);
        this.familles.base.push("Plante");

        this.text = Text;
    };

    useEffect = function () {
        this.owner.discover(4);
        this.move("Défausse");
        this.pose();
    };
}