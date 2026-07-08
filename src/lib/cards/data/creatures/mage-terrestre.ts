import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class MageTerrestre extends Creature {
    name = "Mage terrestre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Terre", 12]]);

        this.initFamily(["Nain", "Mage"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Endurance").init(3);

        this.addText(`Quand posé : Génère {card:Cairn} sur votre terrain.`);
    };

    useEffect = () => {
        this.move("Terrain");
        this.owner().getCard("Cairn").add("Terrain");

        this.pose();
    };
};