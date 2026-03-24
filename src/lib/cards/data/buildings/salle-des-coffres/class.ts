import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class SalleDesCoffres extends Building {
    name = "Salle des coffres";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand posé et quand se prépare sur le terrain : Génère 2 {card:Coffre en bois} dans votre inventaire.`);
    };

    useEffect = () => {
        this.owner().getCard("Coffre en bois").add("Inventaire");
        this.owner().getCard("Coffre en bois").add("Inventaire");

        this.move("Terrain");
        this.pose();
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Coffre en bois").add("Inventaire");
            this.owner().getCard("Coffre en bois").add("Inventaire");
        }
    };
};