import { copy } from '../../../../Utils';
import { Action } from '../Action.js';
import Text from './Text.svelte';

export class VagueDeferlante extends Action {
    name = "Vague déferlante";

    constructor(System) {
        super(System);

        this.init([["Or", 12], ["Eau", 12]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player || this.owner.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let value = 5;
        if (this.owner.ressource("Eau").total() >= 25) {
            this.owner.ressource("Eau").spend(25);
            value = 10;
        }

        let terrain = copy(this.owner.adversary().zone("Terrain").cards);
        for (const card of terrain) {
            card.damage(value);
        }

        this.move("Défausse");
        this.pose();
    };
}