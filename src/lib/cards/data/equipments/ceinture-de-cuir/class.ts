import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CeintureDeCuir extends Equipment {
    name = "Ceinture de cuir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère {card:Option} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Option").add("Inventaire");
        }
    };
};