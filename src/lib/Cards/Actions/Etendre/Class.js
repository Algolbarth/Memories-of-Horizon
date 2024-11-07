import { Action } from '../Action.js';
import Text from './Text.svelte';

export class Etendre extends Action {
    name = "Étendre";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);

        this.text = Text;
    };

    useEffect = function () {
        this.owner.zone("Terrain").size++;

        this.move("Défausse");
        this.pose();
    };
}