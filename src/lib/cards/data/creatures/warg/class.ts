import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Warg extends Creature {
    name = "Warg";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Feu", 25]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(40);

        this.addText(`Quand posé : Génère {card:Frappe} dans votre inventaire.`);
    };

    useEffect = () => {
        this.owner().getCard("Frappe").add("Inventaire");

        this.move("Terrain");
        this.pose();
    };
};