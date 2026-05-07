import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class GuildeDesAventuriers extends Building {
    name = "Guilde des aventuriers";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Aventurier} dans votre inventaire.`);
        this.addText(`Quand un {card:Aventurier} allié est posé : Si sur le terrain : Pioche 1 carte du même type que celui choisi.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Aventurier").add("Inventaire");
        }
    };
};