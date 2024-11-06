import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class MimiqueDeCoffre extends Creature {
    name = "Mimique de coffre";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    useEffect = function () {
        this.move("Terrain", this.owner.adversary());
        this.pose();
    };

    dieEffect = function () {
        this.owner.adversary().draw(5);
    };
}