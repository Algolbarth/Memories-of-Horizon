import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BaguetteDesMarees extends Equipment {
    name = "Baguette des marées";

    constructor(system: System) {
        super(system);

        this.init([["Or", 45], ["Eau", 45]]);

        this.initFamily(["Arme"]);

        this.equipStat("Magie").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Produit autant d'eau que la magie du porteur.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.owner().ressource("Eau").produce(this.bearer.stat("Magie").value());
        }
    };
};