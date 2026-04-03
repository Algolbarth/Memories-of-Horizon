import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class TourDArcher extends Building {
    name = "Tour d'archer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35]]);

        this.stat("Constitution").init(25);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Flèche en bois} dans votre inventaire.`);
        this.addText(`Quand {card:Flèche en bois} est posée : Si sur le terrain : Augmente de 5 les dégâts spéciaux de cette carte.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Flèche en bois").add("Inventaire");
        }
    };
};