import { Action } from '../Action.js';
import Text from './Text.svelte';

export class Agrandissement extends Action {
    name = "Agrandissement";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);

        this.text = Text;
    };

    useEffect = function () {
        this.owner.zone("Main").size++;

        this.move("Défausse");
        this.pose();
    };
}