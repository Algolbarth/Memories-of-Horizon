import { Action } from '../Action.js';
import Text from './Text.svelte';

export class Restockage extends Action {
    name = "Restockage";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);

        this.text = Text;
    };

    useEffect = function () {
        this.owner.refreshShop();
        this.move("Défausse");
        this.pose();
    };
}