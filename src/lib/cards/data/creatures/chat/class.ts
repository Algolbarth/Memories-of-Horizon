import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Chat extends Creature {
    name = "Chat";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(3);

        this.addText(`Quand attaque : Stocke 1 or.`);
    };

    attackEffect = () => {
        this.owner().ressource("Or").stock(1);
    };
};