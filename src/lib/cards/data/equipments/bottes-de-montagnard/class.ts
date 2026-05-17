import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Equipment } from '$lib/cards/class/equipment';
import type { Unit } from '$lib/cards/class/unit';

export class BottesDeMontagnard extends Equipment {
    name = "Bottes de montagnard";

    constructor(system: System) {
        super(system);

        this.init([["Or", 18], ["Terre", 18]]);

        this.equipStat("Vitesse").init(2);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Produit autant de terre que de cartes d'élément Terre sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card.isElement("Terre")) {
                    this.owner().ressource("Terre").produce(1);
                }
            }
        }
    };
};