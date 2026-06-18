import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class MasqueDePlongee extends Equipment {
    name = "Masque de plongée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Eau", 15]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vigueur").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Génère {card:Bulle protectrice} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().getCard("Bulle protectrice").add("Inventaire");
        }
    };
};