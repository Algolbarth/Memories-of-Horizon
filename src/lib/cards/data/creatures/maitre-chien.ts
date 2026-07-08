import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class MaitreChien extends Creature {
    name = "Maître chien";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Génère 2 {card:Chien} sur votre terrain.`);
        this.addText(`Quand se prépare sur le terrain : Génère {card:Chien} sur votre terrain.`);
    };

    useEffect = () => {
        this.move("Terrain");
        this.owner().getCard("Chien").add("Terrain");
        this.owner().getCard("Chien").add("Terrain");

        this.pose();
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Chien").add("Terrain");
        }
    };
};