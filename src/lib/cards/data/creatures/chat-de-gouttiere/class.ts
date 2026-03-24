import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ChatDeGouttiere extends Creature {
    name = "Chat de gouttière";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(15);

        this.addText(`Quand attaque : Stocke 1 or.`);
        this.addText(`Quand une autre créature alliée de famille Bête attaque : Augmente de 3 la force de cette créature pendant ce tour.`);
    };

    fightEffect = () => {
        this.owner().ressource("Or").stock(1);
    };

    otherFightEffect = (card: Creature) => {
        if (card.isAlly(this) && card.isFamily("Bête")) {
            card.stat("Force").turn += 3;
        }
    };
};