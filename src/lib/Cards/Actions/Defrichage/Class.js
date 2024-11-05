import { Action } from '../Action.js';
import Text from './Text.svelte';

export class Defrichage extends Action {
    name = "Défrichage";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Végétal", 25]]);

        this.text = Text;
    };

    useEffect = function () {
        this.owner.zone("Terrain").size++;

        this.move("Défausse");
        this.pose();
    };
}