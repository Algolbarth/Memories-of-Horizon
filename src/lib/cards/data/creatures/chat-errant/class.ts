import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ChatErrant extends Creature {
    name = "Chat errant";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(3);

        this.addText(`Au début de la phase de combat : Génère {card:Chat} sur votre terrain.`);
        this.addText(`Quand attaque : Stocke 1 or.`);
    };

    startBattleEffect = () => {
        this.owner().getCard("Chat").add("Terrain");
    };

    fightEffect = () => {
        this.owner().ressource("Or").stock(1);
    };
};