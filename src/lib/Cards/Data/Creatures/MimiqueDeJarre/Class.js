import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class MimiqueDeJarre extends Creature {
    name = "Mimique de jarre";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    useEffect = function () {
        this.move("Terrain", this.owner.adversary());
        this.pose();
    };

    dieEffect = function () {
        this.owner.adversary().ressource("Or").stock += 10;
    };
}