import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class ParcheminDeSagesse extends Item {
    name = "Parchemin de sagesse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Réduit d'autant le coût d'une carte sur votre pile que 5 fois votre intelligence cumulée.`);
    };

    canUse = () => {
        if (this.owner().totalIntelligence() == 0) {
            return false;
        }
        for (const card of this.owner().zone("Pile").cards) {
            if (card.costTotal() > 0) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Pile")],
                (target: Card) => {
                    return target.costTotal() > 0;
                },
                (target: Card) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Pile").cards) {
            if (target == undefined && card.costTotal() > 0) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Card) => {
        this.targeting(target);

        target.costReduce(5 * this.owner().totalIntelligence());

        this.move("Défausse");
        this.pose();
    };
};