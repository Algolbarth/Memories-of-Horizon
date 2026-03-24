import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ChatDomestique extends Creature {
    name = "Chat domestique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 60]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(3);

        this.addText(`Quand attaque : Stocke 1 or.`);
        this.addText(`Quand une autre créature alliée de famille Bête attaque : Stocke 1 or.`);
    };

    fightEffect = () => {
        this.owner().ressource("Or").stock(1);
    };

    otherFightEffect = (card: Creature) => {
        if (card.isAlly(this) && card.isFamily("Bête")) {
            this.owner().ressource("Or").stock(1);
        }
    };
};