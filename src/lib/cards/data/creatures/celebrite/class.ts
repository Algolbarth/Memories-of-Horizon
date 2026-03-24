import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Celebrite extends Creature {
    name = "Célébrité";

    constructor(system: System) {
        super(system);

        this.init([["Or", 45]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Génère 2 {card:Garde} sur votre terrain.`);
    };

    useEffect = () => {
        this.move("Terrain");
        this.owner().getCard("Garde").add("Terrain");
        this.owner().getCard("Garde").add("Terrain");

        this.pose();
    };
};