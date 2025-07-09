import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class Caserne extends Batiment {
    name = "Caserne";

    constructor(System) {
        super(System);

        this.init([["Or", 40]]);
        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;

        this.text = Text;
    };

    turnEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.getCard("Soldat").add("Terrain");
        }
    };
}