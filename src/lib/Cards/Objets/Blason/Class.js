import { Objet } from '../Objet.js';
import Text from './Text.svelte';

export class Blason extends Objet {
    name = "Blason";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player || this.owner.zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let terrain = this.System.copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            card.stat("Défense").add += 3;
        }
        this.move("Défausse");
        this.pose();
    };
}