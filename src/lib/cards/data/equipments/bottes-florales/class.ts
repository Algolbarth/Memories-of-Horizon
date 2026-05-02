import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Equipment } from '$lib/cards/class/equipment';

export class BottesFlorales extends Equipment {
    name = "Bottes florales";

    constructor(system: System) {
        super(system);

        this.init([["Or", 18], ["Nature", 18]]);

        this.equipStat("Vitesse").init(2);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Produit autant de nature que de cartes d'élément Nature sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            let battlefield = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card.isElement("Nature")) {
                    this.owner().ressource("Nature").produce(1);
                }
            }
        }
    };
};