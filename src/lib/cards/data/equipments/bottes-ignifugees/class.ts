import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Equipment } from '$lib/cards/class/equipment';

export class BottesIgnifugees extends Equipment {
    name = "Bottes ignifugées";

    constructor(system: System) {
        super(system);

        this.init([["Or", 18], ["Feu", 18]]);

        this.equipStat("Vitesse").init(2);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Produit autant de feu que de cartes d'élément Feu sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            let battlefield = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card.isElement("Feu")) {
                    this.owner().ressource("Feu").produce(1);
                }
            }
        }
    };
};