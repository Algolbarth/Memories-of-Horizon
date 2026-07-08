import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class Carquois extends Equipment {
    name = "Carquois";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère {card:Flèche en bois} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Flèche en bois").add("Inventaire");
        }
    };
};