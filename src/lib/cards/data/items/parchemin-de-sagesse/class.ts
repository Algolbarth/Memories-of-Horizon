import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import type { Card } from '$lib/cards/class/card';
import Use from './use.svelte';

export class ParcheminDeSagesse extends Item {
    name = "Parchemin de sagesse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Réduit d'autant le coût d'une carte sur votre pile que 5 fois votre intelligence cumulée.`);
    };

    canUse = () => {
        if (this.owner().totalIntelligence() > 0 && this.owner().zone("Pile").cards.length > 0) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            this.useEffect(this.owner().zone("Pile").cards[0]);
        }
    };

    useEffect = (target: Card) => {
        this.targeting(target);

        target.costReduce(5 * this.owner().totalIntelligence());

        this.move("Défausse");
        this.pose();
    };
};