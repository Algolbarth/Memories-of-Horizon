import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class SouffleEnflamme extends Action {
    name = "Souffle enflammé";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Feu", 15]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
        }
        else {
            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.owner.adversary().zone("Terrain").cards[0]);
            }
        }
    };

    useEffect = function (target) {
        target.damage(20);
        if (target.slot > 0) {
            target.zone.cards[target.slot - 1].damage(20);
        }
        if (target.slot < target.zone.cards.length - 1) {
            target.zone.cards[target.slot + 1].damage(20);
        }

        this.move("Défausse");
        this.pose();
    };
}