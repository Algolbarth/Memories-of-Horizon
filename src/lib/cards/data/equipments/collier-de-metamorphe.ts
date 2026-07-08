import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CollierDeMetamorphe extends Equipment {
    name = "Collier de métamorphe";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Druide"]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère {card:Métamorphose} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Métamorphose").add("Inventaire");
        }
    };
};