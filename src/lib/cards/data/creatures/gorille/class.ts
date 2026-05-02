import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Gorille extends Creature {
    name = "Gorille";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Nature", 25]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(35);
        this.stat("Force").init(10);

        this.addText(`Quand posé : Génère {card:Écrasement} dans votre inventaire.`);
    };

    useEffect = () => {
        this.owner().getCard("Écrasement").add("Inventaire");

        this.move("Terrain");
        this.pose();
    };
};