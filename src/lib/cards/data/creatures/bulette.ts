import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Bulette extends Creature {
    name = "Bulette";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Terre", 25]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Endurance").init(15);

        this.addText(`Quand posé : Génère {card:Contre} dans votre inventaire.`);
    };

    useEffect = () => {
        this.owner().getCard("Contre").add("Inventaire");

        this.move("Terrain");
        this.pose();
    };
};