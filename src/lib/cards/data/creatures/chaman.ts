import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Chaman extends Creature {
    name = "Chaman";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Terre", 15]]);

        this.initFamily(["Minotaure"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Au début de la phase de combat : Si sur le terrain : Génère {card:Totem} sur le terrain adverse.`);
    };

    startBattleEffect = () => {
        if (this.isArea("Terrain")) {
            this.adversary().getCard("Totem").add("Terrain");
        }
    };
};