import { Action } from '../Action.js';
import Text from './Text.svelte';

export class Exploration extends Action {
    name = "Exploration";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);

        this.text = Text;
    };

    useEffect = function () {
        this.owner.zone("Boutique").size++;

        this.move("Défausse");
        this.pose();
    };
}